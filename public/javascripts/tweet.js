window.addEventListener("DOMContentLoaded", () => {
  funcTweet();
});

const funcTweet = () => {
  const listTweet = document.querySelector("#tweetList");

  const tabList = document.querySelectorAll("button");
  const nbreTweets = document.querySelector(".nbre-tweets");

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
            console.log("nbre :", listTweet.querySelectorAll("li").length);
            nbreTweets.textContent =
              listTweet.querySelectorAll("li").length !== 0
                ? listTweet.querySelectorAll("li").length
                : "-";
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
