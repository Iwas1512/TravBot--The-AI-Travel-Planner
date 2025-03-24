export const SelectTravelesList = [{
    id:1,
    title:'Just me',
    desc: 'A sole traveles in exploration',
    icon:'✈︎',
    people:'1'
},
 {
    id:2,
    title:'A Couple',
    desc: 'Two traveles in tandem',
    icon:'🥂',
    people:'2'
},
{
    id:3,
    title:'Family',
    desc: 'A group of fun loving adv',
    icon:'🏠',
    people:'3 to 5 people'
},
{
    id:4,
    title:'Friends (>5)',
    desc: 'Group of friends',
    icon:'👥',
    people:'5-10'
}


]

export const SelectBudgetOptions =[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💸',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Average Cost',
        icon:'💰',
    },
    
    {
        id:3,
        title:'Luxury',
        desc:'Pretty Expensive',
        icon:'🤑',
    },
    

    
]

export const AI_PROMPT = 'Generate Travel Plan for Location:{location}, for {totalDays} Days for {traveler} people with a {budget} budget, give me Hotels options list with HotelName, Hotel address, price, hotle image url, geo cordinates, rating, descriptions and suggest itineray(array) with placeName, Place Details, Place Image URL, Geo Coordinates, Ticket Pricing, Time travel each of the location for {totalDays} days with each day plan. IMPORTANT: Each activity MUST include a specific "timePlan" field (e.g. "10:00 AM - 12:00 PM") indicating the recommended time to visit. Format the response in JSON format.'