---
title: Sublime Text 3 플러그인
tag: sublime text
---
## Install Sublime Text 3

## Install Package Control
https://packagecontrol.io/installation

## Plugin

#### SideBarEnhancements

#### SublimeCodeIntel
Add below codes in `~/.codeintel/config` or `<PROJECT_ROOT>/.codeintel/config`

```json
{
    "Python": {
        "python": "~/virtualenvs/<VENV_ROOT>/bin/python",
        "pythonExtraPaths": ["~/virtualenvs/<VENV_ROOT>/lib/python3.5/site-packages",
        ]
    },
}
```

#### SublimeLinter

#### SublimeLinter-flake8
```
$ pip install flake8
```

Add below codes in `Preference -> Package Settings -> SublimeLinter -> Setting - User`

```json
{
    "user": {
        "debug": false,
        "delay": 0.25,
        "error_color": "D02000",
        "gutter_theme": "Packages/SublimeLinter/gutter-themes/Default/Default.gutter-theme",
        "gutter_theme_excludes": [],
        "lint_mode": "background",
        "linters": {
            "flake8": {
                "@disable": false,
                "args": [],
                "builtins": "",
                "excludes": [],
                "ignore": "",
                "jobs": "1",
                "max-complexity": 10,
                "max-line-length": null,
                "select": "",
                "show-code": false
            }
        },
        "mark_style": "outline",
        "no_column_highlights_line": false,
        "passive_warnings": false,
        "paths": {
            "linux": [
                "/home/pueue/virtualenvs/<VENV_ROOT>/bin"
            ],
            "osx": [
                "/Users/pueue/virtualenvs/<VENV_ROOT>/bin"
            ],
            "windows": []
        },
        "python_paths": {
            "linux": [
                "/home/pueue/virtualenvs/<VENV_ROOT>/bin"
            ],
            "osx": [
                "/Users/pueue/virtualenvs/<VENV_ROOT>/bin"
            ],
            "windows": []
        },
        "rc_search_limit": 3,
        "shell_timeout": 10,
        "show_errors_on_save": false,
        "show_marks_in_minimap": true,
        "syntax_map": {
            "html (django)": "html",
            "html (rails)": "html",
            "html 5": "html",
            "javascript (babel)": "javascript",
            "magicpython": "python",
            "php": "html",
            "python django": "python",
            "pythonimproved": "python"
        },
        "warning_color": "DDB700",
        "wrap_find": true
    }
}
```

#### Theme - Flatland

#### SFTP

#### MarkdownEditing

#### GitGutter

#### Djaneiro

#### BracketHighlighter
Add below codes in `Preference -> Package Settings -> Bracket Highlighter -> Bracket Setting - User`

```json
{
    "bracket_styles": {
        "angle": {
            "color": "entity.name.class",
            "style": "outline"
        },
        "tag": {
            "color": "entity.name.class",
            "style": "outline"
        },
        "default": {
            "color": "entity.name.class",
            "style": "outline"
        }
    }
}
```

## Preference
Add below codes in `Preference -> Setting - User`

```json
{
    "auto_complete": false,
    "auto_complete_commit_on_tab": true,
    "auto_match_enabled": true,
    "bold_folder_labels": true,
    "caret_style": "phase",
    "color_scheme": "Packages/User/SublimeLinter/Flatland Dark (SL).tmTheme",
    "draw_minimap_border": true,
    "draw_white_space": "none",
    "font_face": "D2Coding",
    "font_size": 16,
    "ignored_packages":
    [
        //"Markdown",
        //"Vintage"
    ],
    "rulers":
    [
        72,
        79,
        100
    ],
    "theme": "Flatland Dark.sublime-theme",
    "word_wrap": false,
    "wrap_width": 79
}
```
