export default function copyUrl() {
  const textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.value = window.document.location.href;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
