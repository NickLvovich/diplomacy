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
england = Country.create(name:"England" ,game: game , user: dick)
france = Country.create(name: "France",game: game , user: timmy)
germany = Country.create(name: "Germany",game: game , user: ricky)
italy  = Country.create(name: "Italy",game: game , user: smith)
turkey = Country.create(name: "Turkey",game: game , user: belle)

turnone = Turn.create(season: "Spring", year: 1901, game: game)
turntwo = Turn.create(season: "Fall", year: 1901, game: game)
turnthree = Turn.create(season: "Spring", year: 1902, game: game)
turnfour = Turn.create(season: "Fall", year: 1902, game: game)
turnfive = Turn.create(season: "Spring", year: 1903, game: game)
turnsix = Turn.create(season: "Fall", year: 1903, game: game)
turnseven = Turn.create(season: "Spring", year: 1904, game: game)


armyman = Unit.create(unit_type: "army", territory: "Alb",country: russia)
boatman = Unit.create(unit_type: "fleet", territory: "Ank",country: austria)
armyman2 = Unit.create(unit_type: "army", territory: "Apu",country: england)
boatman2 = Unit.create(unit_type: "fleet", territory: "Rom",country: france)
armyman3 = Unit.create(unit_type: "army", territory: "Nap",country: germany)
boatman3 = Unit.create(unit_type: "fleet", territory: "Tri",country: italy)
armyman4 = Unit.create(unit_type: "army", territory: "Mun",country: turkey)
boatman4 = Unit.create(unit_type: "fleet", territory: "WES",country: italy)
armyman5 = Unit.create(unit_type: "army", territory: "Mar",country: germany)
boatman5 = Unit.create(unit_type: "fleet",coast: "NC", territory: "Spa",country: russia)



# t.string :unit_type
# t.string :coast
# t.string :territory
# t.integer :country_id
