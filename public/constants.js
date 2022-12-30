const COLORS = {
	RED: "RED",
	ORANGE: "ORANGE",
	YELLOW: "YELLOW",
	GREEN: "GREEN",
	CYAN: "CYAN",
	BLUE: "BLUE",
	PURPLE: "PURPLE",
	PINK: "PINK"
};

const CORAL_SPECIES = {
  FUNGIA_SCUTARIA: "FUNGIA_SCUTARIA",
  ACROPORA_LORIPES: "ACROPORA_LORIPES",
  ACROPORA_MILLEPORA: "ACROPORA_MILLEPORA"
}; 

const MQTT_TOPICS = {
	CUSTOMIZER : 'CUSTOMIZER',
	PREVENT_TIMEOUT: `PREVENT_TIMEOUT`,
};


const CORAL_RESPONSE_CATEGORIES = {
	SPECIES: `SPECIES`,
	COLOR: `COLOR`,
	NICKNAME: `NICKNAME`,
};


const CORAL_RESPONSES = {
	SPECIES: {
		FUNGIA_SCUTARIA: `
				I'm a mushroom coral, living in soft shallow sand and coral rubble zones.
				I am phototaxic, so move towards the light - up to 12 inches per day! 
				If I touch another coral, I'll generate harmful mucus to protect myself. 
				`,
		ACROPORA_LORIPES: `
			I'm a branching colonial coral, common to upper reef slopes and reef flats in the Indo-Pacific. 
			I have a variety of growth forms, like plate-like layers or stalks. 
			I'm afraid of crown-of-thorns starfish because they feed on my external tissue and polyps.
		`,
		ACROPORA_MILLEPORA: `
			I'm a cylindrical, colonial coral. 
			Tubular corallites, skeletal cups formed by stony coral polyps, are responsible for my scale-like appearance. 
			I live in shallow, protected reefs of the western Indo Pacific, sticking out of the water during low-tide. 
		`,
	},
	COLORS: {

	},
	NICKNAME: {

	},
}
