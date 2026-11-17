// --- Treasury Tipped Occupation Codes (TTOC) ---
// The official list of occupations that customarily and regularly received
// tips on or before December 31, 2024, published by the IRS ("Occupations
// that customarily and regularly received tips on or before Dec. 31, 2024",
// irs.gov) under the final regulations for the section 224 "no tax on tips"
// deduction (TD 10044, Federal Register April 13, 2026).
// 71 occupations in 8 categories. From tax year 2026 the code is reported in
// Box 14b of Form W-2 (alongside Box 12 code TP for total cash tips).
// Code 000 is NOT an occupation: employers enter it when tips were received
// in an occupation that is not on this list — those tips do not qualify.

export interface TtocOccupation {
  code: string;
  title: string;
  category: string;
  examples: string;
}

export const TTOC_CATEGORIES = [
  "Beverage and food service",
  "Entertainment and events",
  "Hospitality and guest services",
  "Home services",
  "Personal services",
  "Personal appearance and wellness",
  "Recreation and instruction",
  "Transportation and delivery",
] as const;

export const TTOC_OCCUPATIONS: TtocOccupation[] = [
  // Beverage and food service (100s)
  { code: "101", title: "Bartenders", category: "Beverage and food service", examples: "Barkeep, mixologist, taproom attendant, sommelier" },
  { code: "102", title: "Wait staff", category: "Beverage and food service", examples: "Cocktail waitress, dining car server, banquet staff" },
  { code: "103", title: "Food or beverage servers, non-restaurant", category: "Beverage and food service", examples: "Room service food server, boat hop, beer cart server" },
  { code: "104", title: "Dining room and cafeteria attendants and bartender helpers", category: "Beverage and food service", examples: "Bar back, bar helper, busser" },
  { code: "105", title: "Chefs and cooks", category: "Beverage and food service", examples: "Executive chef, pastry chef, sous chef, fast food cook, private chef, restaurant cook, food truck cook, caterer" },
  { code: "106", title: "Food preparation workers", category: "Beverage and food service", examples: "Salad maker, sandwich maker, fruit and vegetable parer, kitchen steward" },
  { code: "107", title: "Fast food and counter workers", category: "Beverage and food service", examples: "Barista, ice cream server, cafeteria server" },
  { code: "108", title: "Dishwashers", category: "Beverage and food service", examples: "Dish room worker, silverware cleaner" },
  { code: "109", title: "Host staff, restaurant, lounge, and coffee shop", category: "Beverage and food service", examples: "Maître d'hôtel, dining room host" },
  { code: "110", title: "Bakers", category: "Beverage and food service", examples: "Bread baker, cake baker, bagel baker, pastry finisher" },

  // Entertainment and events (200s)
  { code: "201", title: "Gambling dealers", category: "Entertainment and events", examples: "Blackjack dealer, craps dealer, poker dealer, roulette dealer, pit clerk" },
  { code: "202", title: "Gambling change persons and booth cashiers", category: "Entertainment and events", examples: "Slot attendant, mutuel teller" },
  { code: "203", title: "Gambling cage workers", category: "Entertainment and events", examples: "Casino cashier, cage cashier" },
  { code: "204", title: "Gambling and sports book writers and runners", category: "Entertainment and events", examples: "Betting runner, bingo worker, keno runner, race book writer" },
  { code: "205", title: "Dancers", category: "Entertainment and events", examples: "Club dancer, dance artist" },
  { code: "206", title: "Musicians and singers", category: "Entertainment and events", examples: "Instrumentalist, accompanist, lounge singer" },
  { code: "207", title: "Disc jockeys, except radio", category: "Entertainment and events", examples: "Deejay, club DJ" },
  { code: "208", title: "Entertainers and performers", category: "Entertainment and events", examples: "Comedian, clown, magician, street performer" },
  { code: "209", title: "Digital content creators", category: "Entertainment and events", examples: "Streamer, online video creator, social media influencer, podcaster" },
  { code: "210", title: "Ushers, lobby attendants, and ticket takers", category: "Entertainment and events", examples: "Ticket collector, theater usher" },
  { code: "211", title: "Locker room, coatroom, and dressing room attendants", category: "Entertainment and events", examples: "Coat checker, washroom attendant, bathhouse attendant" },

  // Hospitality and guest services (300s)
  { code: "301", title: "Baggage porters and bellhops", category: "Hospitality and guest services", examples: "Hotel baggage handler, curbside airport check-in assistant, doorman" },
  { code: "302", title: "Concierges", category: "Hospitality and guest services", examples: "Hotel guest service agent, activities concierge" },
  { code: "303", title: "Hotel, motel, and resort desk clerks", category: "Hospitality and guest services", examples: "Front desk clerk, registration clerk" },
  { code: "304", title: "Maids and housekeeping cleaners", category: "Hospitality and guest services", examples: "Hotel maid, housekeeping staff" },

  // Home services (400s)
  { code: "401", title: "Home maintenance and repair workers", category: "Home services", examples: "Handyman, roofer, window repairer, house painter, flooring installer, piano tuner, furniture restorer" },
  { code: "402", title: "Home landscaping and groundskeeping workers", category: "Home services", examples: "Lawn mower, gardener, tree trimmer, weed sprayer" },
  { code: "403", title: "Home electricians", category: "Home services", examples: "Electrician" },
  { code: "404", title: "Home plumbers", category: "Home services", examples: "Plumber, pipefitter, steamfitter, sprinkler installer" },
  { code: "405", title: "Home heating and air conditioning mechanics and installers", category: "Home services", examples: "Air conditioning repairer, heating system installer, chimney sweep" },
  { code: "406", title: "Home appliance installers and repairers", category: "Home services", examples: "Washing machine installer, dishwasher repairer" },
  { code: "407", title: "Home cleaning service workers", category: "Home services", examples: "House cleaner, pool cleaner, carpet cleaner, window washer" },
  { code: "408", title: "Locksmiths", category: "Home services", examples: "Safe installer, key maker" },
  { code: "409", title: "Roadside assistance workers", category: "Home services", examples: "Tow truck driver, car battery technician, tire repairer, tire changer, car fuel deliverer" },

  // Personal services (500s)
  { code: "501", title: "Personal care and service workers", category: "Personal services", examples: "Elderly companion, personal care aide, butler, house sitter, personal valet" },
  { code: "502", title: "Private event planners", category: "Personal services", examples: "Wedding planner, party planner" },
  { code: "503", title: "Private event and portrait photographers", category: "Personal services", examples: "Wedding photographer, headshot photographer" },
  { code: "504", title: "Private event videographers", category: "Personal services", examples: "Wedding videographer" },
  { code: "505", title: "Event officiants", category: "Personal services", examples: "Wedding officiant, funeral celebrant, clergy, vow renewal officiant" },
  { code: "506", title: "Pet and show animal caretakers", category: "Personal services", examples: "Pet groomer, pet sitter, pet walker, kennel worker, pet trainer, horse groomer" },
  { code: "507", title: "Tutors", category: "Personal services", examples: "Reading tutor, math tutor, language tutor" },
  { code: "508", title: "Nannies and babysitters", category: "Personal services", examples: "Au pair, child sitter at hotels and gyms" },
  { code: "509", title: "Visual artists", category: "Personal services", examples: "Ice sculptor, caricature sketch artist" },
  { code: "510", title: "Floral designers", category: "Personal services", examples: "Corsage maker, florist, flower arranger, event florist" },

  // Personal appearance and wellness (600s)
  { code: "601", title: "Skincare specialists", category: "Personal appearance and wellness", examples: "Facialist, electrologist, spa esthetician" },
  { code: "602", title: "Massage therapists", category: "Personal appearance and wellness", examples: "Masseuse, deep tissue massage therapist, sports massage therapist" },
  { code: "603", title: "Barbers, hairdressers, hairstylists, and cosmetologists", category: "Personal appearance and wellness", examples: "Wig stylist, beautician, hair colorist, hair cutter" },
  { code: "604", title: "Shampooers", category: "Personal appearance and wellness", examples: "Scalp treatment specialist, shampoo assistant" },
  { code: "605", title: "Manicurists and pedicurists", category: "Personal appearance and wellness", examples: "Nail technician, fingernail sculptor, nail painter" },
  { code: "606", title: "Eyebrow and eyelash technicians", category: "Personal appearance and wellness", examples: "Eyebrow waxer, eyelash extension technician" },
  { code: "607", title: "Makeup artists", category: "Personal appearance and wellness", examples: "Wedding makeup artist, party makeup artist" },
  { code: "608", title: "Exercise trainers and group fitness instructors", category: "Personal appearance and wellness", examples: "Aerobics trainer, yoga instructor, personal trainer" },
  { code: "609", title: "Tattoo artists and piercers", category: "Personal appearance and wellness", examples: "Tattoo artist, ear piercer, nose piercer" },
  { code: "610", title: "Tailors", category: "Personal appearance and wellness", examples: "Tailor, seamstress, clothing alterations worker" },
  { code: "611", title: "Shoe and leather workers and repairers", category: "Personal appearance and wellness", examples: "Cobbler, shoe shiner" },

  // Recreation and instruction (700s)
  { code: "701", title: "Golf caddies", category: "Recreation and instruction", examples: "Golf caddie, golf cart attendant" },
  { code: "702", title: "Self-enrichment teachers", category: "Recreation and instruction", examples: "Knitting instructor, piano teacher, art instructor, dance teacher" },
  { code: "703", title: "Recreational and tour pilots", category: "Recreation and instruction", examples: "Helicopter tour pilot, hot air balloon aeronaut, skydiving pilot" },
  { code: "704", title: "Tour guides", category: "Recreation and instruction", examples: "Museum guide, sightseeing guide" },
  { code: "705", title: "Travel guides", category: "Recreation and instruction", examples: "Cruise director, river expedition guide" },
  { code: "706", title: "Sports and recreation instructors", category: "Recreation and instruction", examples: "Diving instructor, ski instructor, tennis teacher, surfing instructor" },

  // Transportation and delivery (800s)
  { code: "801", title: "Parking and valet attendants", category: "Transportation and delivery", examples: "Parking garage attendant, valet parker" },
  { code: "802", title: "Taxi and rideshare drivers and chauffeurs", category: "Transportation and delivery", examples: "Cab driver, personal driver, platform/app-based rideshare driver" },
  { code: "803", title: "Shuttle drivers", category: "Transportation and delivery", examples: "Airport shuttle driver, hotel shuttle driver, rental car shuttle driver" },
  { code: "804", title: "Goods delivery people", category: "Transportation and delivery", examples: "Pizza delivery driver, grocery delivery driver, bicycle courier, package delivery person, app/platform-based delivery person" },
  { code: "805", title: "Personal vehicle and equipment cleaners", category: "Transportation and delivery", examples: "Car wash attendant, auto detailer, boat waxer" },
  { code: "806", title: "Private and charter bus drivers", category: "Transportation and delivery", examples: "Motor coach bus driver, tour bus driver" },
  { code: "807", title: "Water taxi operators and charter boat workers", category: "Transportation and delivery", examples: "Water taxi captain, air boat operator, charter boat deckhand, charter boat steward" },
  { code: "808", title: "Rickshaw, pedicab, and carriage drivers", category: "Transportation and delivery", examples: "Horse drawn carriage driver, bike taxi driver" },
  { code: "809", title: "Home movers", category: "Transportation and delivery", examples: "Furniture mover, packer, piano mover, art mover" },
  { code: "810", title: "Gas pump attendant", category: "Transportation and delivery", examples: "Gas pumper" },
];

export function findTtoc(code: string): TtocOccupation | undefined {
  const c = code.trim();
  return TTOC_OCCUPATIONS.find((o) => o.code === c);
}
