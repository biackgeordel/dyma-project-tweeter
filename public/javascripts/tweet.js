window.addEventListener("DOMContentLoaded", () => {
  funcTweet();
});

const funcTweet = () => {
  const listTweet = document.querySelector("#tweetList");

  const tabList = document.querySelectorAll("button");
  const nbreTweets = document.querySelector(".nbre-tweets");
  let compteur = 0;

  console.log(tabList);
  tabList.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const tweetid = e.currentTarget.getAttribute("tweetid");
      const action = e.currentTarget.dataset.text;
      switch (action) {
        case "delete":
          const response = await axios.delete("/tweets/" + tweetid);
          console.log(response);
          if (response.status === 200) {
            listTweet.innerHTML = response.data;
            listTweet.querySelectorAll("li").forEach((el) => {
              if (el.getAttribute("author") === nbreTweets.id) {
                compteur += 1;
              }
            });
            nbreTweets.textContent = compteur != 0 ? compteur : "-";
            return funcTweet();
          }

          break;
        case "edit":
          location.href = "tweets/edit/" + tweetid;
          break;
      }
    });
  });
};
