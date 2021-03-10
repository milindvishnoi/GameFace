// this file contains temp data for the App
const games = [
  {
    title: "NBA2K22",
    score: "77",
    link: "/games/nba2k22",
    imgSrc: "/games/nba2k22.jpg",
    description: "NBA 2K22 is the latest title in the world-renowned, \
                  best-selling NBA 2K series, delivering an industry-leading \
                  sports video game experience on console.\n\n \
                  With extensive improvements upon its best-in-class \
                  graphics and gameplay, competitive and community \
                  online features, and deep, varied game modes, NBA \
                  2K22 offers one-of-a-kind immersion into all facets \
                  of NBA basketball and culture - where Everything is Game.",
    tags: ["Sports", "2K", "Single Player", "Multiplayer", "PS4", "XBox"]
  }
]

const user = {
  username: "mills1020",
  country: "country1",
  nickname: "nickname1",
  bio: "I am a gamer who loves to play Sport games from FIFA to NBA, I would \
        love to play with you. Although my favourite game is Madien 2k22.",
  games: [{gameName: "NBA2K22", ign: "LBJ"},
          {gameName: "game2", ign: "bestplayer"},
          {gameName: "game3", ign: "worstplayer"}],
  discussions: [{gameName: "NBA2K22", content: "I could just copy-paste my NBA 2k20 review, but that would be hypocritical."},
                {gameName: "game2", content: "Comment test Comment test Comment test Comment test Comment test \
                                              Comment test Comment test Comment test Comment test Comment test \
                                              Comment test Comment test Comment test Comment test Comment test."},
                {gameName: "game3", content: "I highly recommend buying this game, it's a blast! It has \
                                             appealing visuals and designs, and has plenty of stars and stamps to collect!"}],
  profilePic: "/images/user.jpeg",
  coverPic: "/images/user-cover.jpg",
}

export { games, user }