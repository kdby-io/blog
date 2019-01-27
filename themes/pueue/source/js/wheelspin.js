const list = [
  "Killing time and wasting electricity",
  "Designing alone, producing alone and giggling alone",
  "Creating the unremunerative",
  "Expert in drunken programming",
  "Working hard for living lazy",
  "So, what is that for?",
  "Picking abandoned ideas off the ground",
  "Entropy increaser",
  "Undervalued metaphors and analogies"
];

const spinSpinWheelspin = () => {
  const index = Math.floor(Math.random() * list.length);
  const result = list[index];
  document.getElementById('wheelspin').textContent = result;
}

spinSpinWheelspin();
