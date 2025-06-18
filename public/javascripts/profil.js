console.log("profil");
const img = document.querySelector(".content-img>img");
const form = document.querySelector("form");
const fichier = document.querySelector("input[type=file]");
console.log(img);
img.addEventListener("click", (e) => {
  //   form.classList.toggle("d-none");
  fichier.click();
});
fichier.addEventListener("change", async (e) => {
  console.log("fichier :", e.target.files);
  img.src = URL.createObjectURL(e.target.files[0]);

  //   if (!form.classList.contains("d-none")) {
  //     form.classList.toggle("d-none");
  //   }
  form.submit();
});
