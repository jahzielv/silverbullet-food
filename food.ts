import { editor, markdown } from "$sb/silverbullet-syscall/mod.ts";

const foodEmoji = ["🥔", "🌶️", "🥝", "🥨", "🥞", "🍖", "🍜", "🍞", "🍱"];

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export async function food() {
  console.log("food gang");
  const i = randomNumber(0, foodEmoji.length);
  const e = foodEmoji[i];
  const food = await editor.prompt(e + "enter some food ");
  if (!food) {
    return;
  }

  await editor.navigate("Food Log");
  const mdTree = await markdown.parseMarkdown(await editor.getText());
  const d = new Date();

  await editor.insertAtPos(
    `\n- _${d.toLocaleString()}_ ${food}`,
    mdTree.to ?? 0
  );
}
