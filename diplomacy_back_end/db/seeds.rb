# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

dick = User.create(username:"diplomacyNbourbon");
dakota = User.create(username:"diplomacyMaster5000");
ryan = User.create(username:"rjmascolo")
timmy = User.create(username:"timmers")
ricky = User.create(username:"ricky")
smith = User.create(username:"mrs smith")
belle = User.create(username:"belle")

game = Game.create(name: "big battle")

russia = Country.create(name: "Russia" ,game: game , user: ryan)
austria = Country.create(name: "Austria",game: game , user: dakota)
england = Country.create(name:"England" ,game_id: game , user: dick)
france = Country.create(name: "France",game: game , user: timmy)
germany = Country.create(name: "Germany",game: game , user: ricky)
italy  = Country.create(name: "Italy",game: game , user: smith)
turkey = Country.create(name: "Turkey",game: game , user: belle)
