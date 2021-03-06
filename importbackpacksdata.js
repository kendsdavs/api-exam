var dalNoSql = require('./DAL/no-sql.js')

const backpackData = [{
    name: "Osprey Atmos 65",
    description: "Starting with a dreamlike Osprey suspension, this multiday pack carries gear easily in 9 external pockets, enhancing mobility and comfort while toting heavier loads through the backcountry.",
    in_stock: true,
    cost: "$259",
    type: "multiday",
    date_available: "Available Today!"
}, {
    name: "REI Traverse 70",
    description: "Built for comfort and stability on long hauls with large loads, the REI Traverse 70 lets you customize the fit for ideal support and load balance, while the ventilated mesh back panel keeps you cool.",
    in_stock: true,
    cost: "$239",
    type: "multiday",
    date_available: "Available Today!"
}, {
    name: "Gregory Baltoro 75",
    description: "Winner of Backpacker magazine's 2015 Editors' Choice Gold Award, this extended-trip pack has a fully customizable suspension that adapts to your body for a light and agile feel with a heavy load.",
    in_stock: false,
    cost: "$319",
    type: "multiday",
    date_available: "January 2017"
}, {
    name: "Mammut Trion Pro 50",
    description: "This fast and clean alpine pack sports an extra-durable, nearly waterproof shell with plenty of ski and snow-tool straps for winter expeditions and all-season climbing adventures.",
    in_stock: false,
    cost: "$200",
    type: "multiday",
    date_available: "December 2016"
}, {
    name: "The North Face Terra 65 Pack",
    description: "With a light, user-friendly design, The North Face Terra 65 pack sports a sleek, slimmed-down style that improves load management and reduces overall pack weight for your long weekend trips.",
    in_stock: true,
    cost: "$179",
    type: "multiday",
    date_available: "Available Today!"
}, {
    name: "Granite Gear",
    description: "This award-winning ultralight pack combines Spartan simplicity with a well-engineered suspension capable of toting 40 lb. loads, so you can save weight while maximizing speed and comfort on the trail.",
    in_stock: true,
    cost: "$239.95",
    type: "multiday",
    date_available: "Available Today!"
}, {
    name: "REI Trail 40 Pack",
    description: "This sturdy, big-capacity daypack is also very big on organization and comfort.",
    in_stock: true,
    cost: "$109",
    type: "daypack",
    date_available: "Available Today!"
}, {
    name: "Osprey Talon 22 Pack",
    description: "With a women-specific fit, enhanced comfort and light weight, the The Osprey Tempest 20 Pack excels for your done-in-a-day pursuits. It's designed to accommodate a multitude of outdoor activities.",
    in_stock: true,
    cost: "$99",
    type: "daypack",
    date_available: "Available Today!"
}, {
    name: "REI Flash 18 Pack",
    description: "Handy in town, on trails and for short hikes away from basecamp, the Flash 18 pack cleverly converts into a stuff sack when you turn it inside out.",
    in_stock: false,
    cost: "$39.95",
    type: "daypack",
    date_available: "March 2017"
}, {
    name: "CamelBak Rim Runner 22 Hydration Pack",
    description: "The comfortable CamelBak Rim Runner 22 Hydration Pack is a capable gear hauler with a big reservoir to keep you hydrated during done-in-a-day adventures.",
    in_stock: true,
    cost: "$100",
    type: "daypack",
    date_available: "Available Today!"
}, {
    name: "Salomon S-Lab Adv Skin3 12Set Hydration",
    description: "The ultra-sleek Salomon S-Lab Adv Skin3 12Set Hydration Vest is ideal for endurance trail running, and is large enough to carry the hydration, fuel and essentials required for long endurance races.",
    in_stock: false,
    cost: "$185",
    type: "daypack",
    date_available: "January 2017"
}, {
    name: "Kelty Redwing 44 Pack",
    description: "A reliable workhorse in the wilderness and around town, the Kelty Redwing 44 pack is a comfortable and roomy option for outdoor adventures in the mountains or the city.",
    in_stock: true,
    cost: "$124",
    type: "daypack",
    date_available: "Available Today!"
},]





function callback(msg) {
    return function(err, response) {
      if (err) return console.log(err.message)
      if (response) return console.log(msg, response)
    }
}

backpackData.forEach(function(backpack) {
  dalNoSql.createBackpack(backpack, callback('Congrats! Backpack Created:\n'))
})
