user = [
  email: "matthewvedder@gmail.com",
  password: "password",
  password_confirmation: "password"
]

report = [
  lat: "44.180280441532425",
  long: "-73.96730817854404",
  activity: "hiking",
  title: "Nuisance Bear",
  description: "Two guys were walking in the woods one day when they came across a bear.\n\nThe bear noticed them and started growling and generally getting really mean.  It started to chase one of the guys, who, as it turns out, was from Czechoslovakia.  Unfortunately, the bear soon caught up with him, and ate him alive.Grizzly Bear Story\n\nMeanwhile, the other guy turned around and ran for his life. A little while later, the second guy found a park ranger station and  told his story. The ranger took his gun, and they both went out in search of the bear, in order to destroy it.\n\nSoon, they came across two bears, one male, and one female. The ranger turned to the other guy and said, 'Quick... tell me which bear ate your friend!'\n\nThe ranger levelled his gun and got ready to shoot. 'I'm not really sure,' said the other guy, 'they both look so similar.'\n\n'QUICK! Make up your mind!' demanded the ranger. 'O.K.,' said the other, 'it was the male.' \n\nThe ranger promptly aimed and shot the female bear. The male ran off.  Using his knife, the ranger cut open the belly of the female and found the body of the other man.\n\n'But why didn't you shoot the male when I thought it was the male who ate my friend?' the other man asked.\n\nWell,' said the ranger... 'I never trust anyone who says that the Czech's in the male!'"
]


User.create!(user)
Report.create!(report)
