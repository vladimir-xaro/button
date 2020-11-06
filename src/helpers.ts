const allowInputTypes = [
  'button',
  'submit',
  'reset'
]

export function checkButtonType(el: Element) {
  return el instanceof HTMLButtonElement || (el instanceof HTMLInputElement && allowInputTypes.includes((el as HTMLInputElement).type));
}