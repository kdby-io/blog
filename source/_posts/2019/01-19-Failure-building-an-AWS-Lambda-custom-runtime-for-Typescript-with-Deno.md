---
title: Failure building an AWS Lambda custom runtime for Typescript with Deno
date: 2019-01-19 17:02:33
hidden: true
tags:
---

Now AWS Lambda supports custom runtime. And there is TypeScript runtime called Deno. Is it possible to run '.ts' in Lambda using Deno? Let's try it. Never mind the title.

# What is Deno

[Deno](https://deno.land) is a secure JavaScript / TypeScript runtime built on V8. It is led by Ryan Dahl who created Node.js. If you are interested in Deno, check [his presentation](https://www.youtube.com/watch?v=M3BM9TB-8yA) at JSConf EU 2018.

# What is a custom runtime

Simply, you can also run a function in any language that is not provided by AWS. A runtime is a program that runs a Lambda function. You can build your own runtime to run some other languages.

# Building a custom runtime

Download Deno from [Github repository](https://github.com/denoland/deno/releases/download/v0.2.7/deno_linux_x64.gz), unzip it, and rename `deno_linux_x64` to `deno`.

{% codeblock line_number:false %}
.
└─ deno
{% endcodeblock %}

According to [Custom AWS Lambda runtimes](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html), the runtime is responsible for jobs including getting an event and a context, invoking the function, and handling the response or errors. Instead of implementing them, I forked [lambci/node-custom-lambda](https://github.com/lambci/node-custom-lambda) and migrate `bootstrap.js` code to `runtime.ts` for Deno. [Here](https://github.com/kdby-io/deno-custom-lambda/blob/master/runtime.ts) is `runtime.ts`.

{% codeblock line_number:false %}
.
├─ deno
└─ runtime.ts
{% endcodeblock %}

A custom runtime's entry point is an executable file named `bootstrap`. Make a shell script file named `bootstrap` invoking `runtime.ts`.

{% codeblock bootstrap lang:sh %}
#!/usr/bin/env bash
/opt/deno --allow-all /opt/runtime.ts
{% endcodeblock %}

{% codeblock line_number:false %}
.
├─ bootstrap
├─ deno
└─ runtime.ts
{% endcodeblock %}

Zip these files and create a Lambda layer. If you don't have aws-cli, [install it](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

{% codeblock lang:sh %}
$ zip -r layer.zip bootstrap deno runtime.ts
$ aws lambda publish-layer-version \
    --layer-name deno_027 \
    --description "Deno v0.2.7" \
    --compatible-runtimes provided \
    --license-info MIT \
    --zip-file fileb://layer.zip
{% endcodeblock %}

Add new file named `function.ts`, zip it, and create a lambda function. Replace ARNs to yours in below snippet.

{% codeblock lang:sh %}
$ echo "export const handler = () => ({ Hello: 'World!' })" >> function.ts
$ zip -r function.zip function.ts
$ aws lambda create-function \
    --function-name deno-test \
    --runtime provided \
    --role arn:aws:iam::xxxxxxxxxxxx:role/lambda-role \
    --handler function.handler \
    --layers arn:aws:lambda:ap-northeast-2:xxxxxxxxxxxx:layer:deno_027:1 \
    --zip-file fileb://function.zip
{% endcodeblock %}

Now it is time to try.

{% codeblock lang:sh %}
$ aws lambda invoke --function-name deno-test response.txt
{% endcodeblock %}

See the `response.txt`. Fail...

```json
{
  "errorType": "Runtime.ExitError",
  "errorMessage": "RequestId: c25b323a-c386-44c6-b147-9273deee0ab9 Error: Runtime exited with error: exit status 1"
}
```

On the CloudWatch log, I see this message.

```
/opt/deno: /lib64/libc.so.6: version `GLIBC_2.18' not found (required by /opt/deno)
```

Deno requires GLIBC_2.18 which is not included in Lambda container environment. There is no way to install it to Lambda container environment.

I think [ts-node](https://github.com/TypeStrong/ts-node) might be a custom runtime, but I'm not attracted to that than Deno.
