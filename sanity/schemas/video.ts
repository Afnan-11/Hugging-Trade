import {Rule} from "sanity";

export const video = {
  name: "video",
  title: "REVIEWS VIDEO",
  type: "document",

  fields: [
    {
      name: "reviewsText",
      title: "Review Text (English)",
      description: "Review Text on top of video component in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("English review text is required"),
    },
    {
      name: "reviewsText_de",
      title: "Review Text (German)",
      description: "Review Text on top of video component in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("German review text is required"),
    },
    {
      name: "reviewsText_es",
      title: "Review Text (Spanish)",
      description: "Review Text on top of video component in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Spanish review text is required"),
    },
    {
      name: "reviewsText_fr",
      title: "Review Text (French)",
      description: "Review Text on top of video component in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("French review text is required"),
    },
    {
      name: "reviewsText_it",
      title: "Review Text (Italian)",
      description: "Review Text on top of video component in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Italian review text is required"),
    },
    {
      name: "reviewsText_pt",
      title: "Review Text (Portuguese)",
      description: "Review Text on top of video component in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Portuguese review text is required"),
    },

    {
      name: "nameVideoOne",
      title: "Name Video One",
      description: "Name of Person in First Video",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Video name is required"),
    },

    {
      name: "descriptionForPersonInVideoOne",
      title: "Description For Person In Video One (English)",
      description: "Description For Person In Video One in English",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in English is required"),
    },
    {
      name: "descriptionForPersonInVideoOne_de",
      title: "Description For Person In Video One (German)",
      description: "Description For Person In Video One in German",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in German is required"),
    },
    {
      name: "descriptionForPersonInVideoOne_es",
      title: "Description For Person In Video One (Spanish)",
      description: "Description For Person In Video One in Spanish",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in Spanish is required"),
    },
    {
      name: "descriptionForPersonInVideoOne_fr",
      title: "Description For Person In Video One (French)",
      description: "Description For Person In Video One in French",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in French is required"),
    },
    {
      name: "descriptionForPersonInVideoOne_it",
      title: "Description For Person In Video One (Italian)",
      description: "Description For Person In Video One in Italian",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in Italian is required"),
    },
    {
      name: "descriptionForPersonInVideoOne_pt",
      title: "Description For Person In Video One (Portuguese)",
      description: "Description For Person In Video One in Portuguese",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in Portuguese is required"),
    },

    {
      name: "positionInCompanyOfFirstPerson",
      title: "Position In Company Of First Person (English)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in English is required"),
    },
    {
      name: "positionInCompanyOfFirstPerson_de",
      title: "Position In Company Of First Person (German)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in German is required"),
    },
    {
      name: "positionInCompanyOfFirstPerson_es",
      title: "Position In Company Of First Person (Spanish)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in Spanish is required"),
    },
    {
      name: "positionInCompanyOfFirstPerson_fr",
      title: "Position In Company Of First Person (French)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in French is required"),
    },
    {
      name: "positionInCompanyOfFirstPerson_it",
      title: "Position In Company Of First Person (Italian)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in Italian is required"),
    },
    {
      name: "positionInCompanyOfFirstPerson_pt",
      title: "Position In Company Of First Person (Portuguese)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in Portuguese is required"),
    },

    {
      name: "videoFileForFirstPerson",
      title: "Upload Video For First Person",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule: Rule) => Rule.required().error("Video file is required"),
    },

    {
      name: "nameVideoTwo",
      title: "Name Video Two",
      description: "Name of Person in Second Video",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Video name is required"),
    },

    {
      name: "descriptionForPersonInVideoTwo",
      title: "Description For Person In Video Two (English)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in English is required"),
    },
    {
      name: "descriptionForPersonInVideoTwo_de",
      title: "Description For Person In Video Two (German)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in German is required"),
    },
    {
      name: "descriptionForPersonInVideoTwo_es",
      title: "Description For Person In Video Two (Spanish)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in Spanish is required"),
    },
    {
      name: "descriptionForPersonInVideoTwo_fr",
      title: "Description For Person In Video Two (French)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in French is required"),
    },
    {
      name: "descriptionForPersonInVideoTwo_it",
      title: "Description For Person In Video Two (Italian)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in Italian is required"),
    },
    {
      name: "descriptionForPersonInVideoTwo_pt",
      title: "Description For Person In Video Two (Portuguese)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in Portuguese is required"),
    },

    {
      name: "positionInCompanyOfSecondPerson",
      title: "Position In Company Of Second Person (English)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in English is required"),
    },
    {
      name: "positionInCompanyOfSecondPerson_de",
      title: "Position In Company Of Second Person (German)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in German is required"),
    },
    {
      name: "positionInCompanyOfSecondPerson_es",
      title: "Position In Company Of Second Person (Spanish)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in Spanish is required"),
    },
    {
      name: "positionInCompanyOfSecondPerson_fr",
      title: "Position In Company Of Second Person (French)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in French is required"),
    },
    {
      name: "positionInCompanyOfSecondPerson_it",
      title: "Position In Company Of Second Person (Italian)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in Italian is required"),
    },
    {
      name: "positionInCompanyOfSecondPerson_pt",
      title: "Position In Company Of Second Person (Portuguese)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in Portuguese is required"),
    },

    {
      name: "videoFileForSecondPerson",
      title: "Upload Video For Second Person",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule: Rule) => Rule.required().error("Video file is required"),
    },

    {
      name: "nameVideoThree",
      title: "Name Video Three",
      description: "Name of Person in Third Video",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Video name is required"),
    },

    {
      name: "descriptionForPersonInVideoThree",
      title: "Description For Person In Video Three (English)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in English is required"),
    },
    {
      name: "descriptionForPersonInVideoThree_de",
      title: "Description For Person In Video Three (German)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in German is required"),
    },
    {
      name: "descriptionForPersonInVideoThree_es",
      title: "Description For Person In Video Three (Spanish)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in Spanish is required"),
    },
    {
      name: "descriptionForPersonInVideoThree_fr",
      title: "Description For Person In Video Three (French)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in French is required"),
    },
    {
      name: "descriptionForPersonInVideoThree_it",
      title: "Description For Person In Video Three (Italian)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in Italian is required"),
    },
    {
      name: "descriptionForPersonInVideoThree_pt",
      title: "Description For Person In Video Three (Portuguese)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Description in Portuguese is required"),
    },

    {
      name: "positionInCompanyOfThirdPerson",
      title: "Position In Company Of Third Person (English)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in English is required"),
    },
    {
      name: "positionInCompanyOfThirdPerson_de",
      title: "Position In Company Of Third Person (German)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in German is required"),
    },
    {
      name: "positionInCompanyOfThirdPerson_es",
      title: "Position In Company Of Third Person (Spanish)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in Spanish is required"),
    },
    {
      name: "positionInCompanyOfThirdPerson_fr",
      title: "Position In Company Of Third Person (French)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in French is required"),
    },
    {
      name: "positionInCompanyOfThirdPerson_it",
      title: "Position In Company Of Third Person (Italian)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in Italian is required"),
    },
    {
      name: "positionInCompanyOfThirdPerson_pt",
      title: "Position In Company Of Third Person (Portuguese)",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Position in Portuguese is required"),
    },

    {
      name: "videoFileForThirdPerson",
      title: "Upload Video For Third Person",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule: Rule) => Rule.required().error("Video file is required"),
    },
  ],
};
