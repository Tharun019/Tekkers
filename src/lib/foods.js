// Food list for estimates. Values are per typical serving and approximate;
// check against USDA FoodData Central or the Indian Food Composition Tables.
// name, serving, grams, kcal, protein, carbs, fat, country, diet, words that match it
const ROWS = [
['Chapati / roti','1 medium',40,110,3.5,20,2,'IN','vegan','chapati,chapathi,roti,phulka'],
['Cooked white rice','1 bowl',160,205,4.3,45,.4,'*','vegan','white rice,rice'],
['Dal','1 bowl',200,180,10,26,4,'IN','vegan','dal,daal,dhal'],
['Rajma curry','1 bowl',200,220,12,32,5,'IN','vegan','rajma'],
['Chole / chana masala','1 bowl',200,250,12,35,7,'IN','vegan','chole,chana masala,channa,chana'],
['Paneer','100 g',100,290,18,3,23,'IN','veg','paneer'],
['Curd / dahi','1 bowl',150,95,5,7,5,'IN','veg','curd,dahi,yogurt,yoghurt'],
['Milk','1 glass',250,150,8,12,8,'IN','veg','milk'],
['Boiled egg','1 large',50,78,6.3,.6,5.3,'*','egg','boiled egg,eggs,egg'],
['Omelette / egg bhurji','2 eggs',120,200,13,2,15,'*','egg','omelette,omelet,bhurji,scrambled egg'],
['Chicken curry','1 bowl',200,280,26,6,16,'IN','nonveg','chicken curry'],
['Chicken breast, grilled','100 g',100,165,31,0,3.6,'*','nonveg','chicken breast,grilled chicken,chicken'],
['Fish curry','1 bowl',200,240,24,6,13,'IN','nonveg','fish curry,fish'],
['Chicken biryani','1 plate',300,500,25,60,17,'IN','nonveg','biryani,biriyani'],
['Idli','1 piece',40,60,2,12,.25,'IN','vegan','idli,idly'],
['Plain dosa','1 dosa',90,170,4,28,5,'IN','vegan','dosa,dosai'],
['Sambar','1 bowl',200,130,6,20,3,'IN','vegan','sambar,sambhar'],
['Poha','1 plate',180,250,5,45,6,'IN','vegan','poha,avalakki'],
['Upma','1 plate',180,250,6,40,8,'IN','vegan','upma,uppittu'],
['Curd rice','1 bowl',220,250,7,40,6,'IN','veg','curd rice'],
['Mixed vegetable sabzi','1 bowl',150,150,4,15,8,'IN','vegan','sabzi,sabji,palya,veg curry,vegetable'],
['Oats cooked in milk','1 bowl',240,270,12,37,8,'*','veg','oats,oatmeal,porridge'],
['Banana','1 medium',118,105,1.3,27,.4,'*','vegan','banana'],
['Peanuts','1 handful (30 g)',30,170,7.7,5,14,'*','vegan','peanuts,groundnut'],
['Peanut butter','1 tbsp',16,95,4,3,8,'*','vegan','peanut butter,pb'],
['Moong sprouts','1 bowl',150,45,4.5,9,.3,'IN','vegan','sprouts'],
['Soya chunks','50 g dry',50,172,26,16,.3,'IN','vegan','soya chunks,soy chunks,soya'],
['Sattu drink','30 g powder',30,120,6.5,19,2,'IN','vegan','sattu'],
['Whey protein','1 scoop',30,120,24,3,1.5,'*','veg','whey,protein shake,protein powder'],
['Samosa','1 piece',100,260,4,30,14,'IN','vegan','samosa'],
['Tea with milk and sugar','1 cup',150,60,1.5,9,2,'IN','veg','chai,tea'],
['Oatmeal, cooked in water','1 cup',234,155,6,27,3,'US','vegan','oatmeal'],
['Whole-wheat bread','1 slice',32,80,4,14,1,'*','vegan','bread,toast'],
['Ground turkey, cooked','100 g',100,175,23,0,9,'US','nonveg','turkey'],
['Salmon, cooked','100 g',100,206,22,0,12,'US','nonveg','salmon'],
['Lean ground beef, cooked','100 g',100,217,26,0,12,'US','nonveg','beef'],
['Brown rice, cooked','1 cup',195,215,5,45,1.8,'US','vegan','brown rice'],
['Pasta, cooked','1 cup',140,220,8,43,1.3,'US','vegan','pasta,spaghetti'],
['Sweet potato, baked','1 medium',114,105,2,24,.2,'US','vegan','sweet potato'],
['Potato, baked','1 medium',173,160,4.3,37,.2,'US','vegan','potato'],
['Greek yogurt, non-fat','1 cup (170 g)',170,100,17,6,.7,'US','veg','greek yogurt,greek yoghurt'],
['Cottage cheese, low-fat','1/2 cup',113,90,12,5,2.5,'US','veg','cottage cheese'],
['Milk, 2%','1 cup',244,122,8,12,4.8,'US','veg','milk'],
['Chocolate milk','1 cup',250,190,8,30,5,'US','veg','chocolate milk'],
['Black beans','1/2 cup',86,114,7.6,20,.5,'US','vegan','black beans,beans'],
['Tofu, firm','100 g',100,144,17,3,9,'*','vegan','tofu'],
['Almonds','1 handful (28 g)',28,164,6,6,14,'*','vegan','almonds,badam'],
['Apple','1 medium',182,95,.5,25,.3,'*','vegan','apple'],
['Tuna, canned in water','1 can',120,120,26,0,1,'US','nonveg','tuna'],
['Bagel','1 plain',100,270,10,53,1.5,'US','vegan','bagel'],
['Turkey sandwich','1 sandwich',220,350,24,38,10,'US','nonveg','turkey sandwich,sandwich'],
['Chicken burrito bowl','1 bowl',450,650,40,75,20,'US','nonveg','burrito bowl,burrito'],
['Cheese pizza','1 slice',107,285,12,36,10,'US','veg','pizza'],
['Cheeseburger','1 burger',120,300,15,33,13,'US','nonveg','cheeseburger,burger'],
['Protein bar','1 bar',60,200,20,22,7,'US','veg','protein bar'],
['Avocado','1/2 fruit',100,160,2,9,15,'US','vegan','avocado'],
['Quinoa, cooked','1 cup',185,222,8,39,3.6,'US','vegan','quinoa'],
['Lentil soup','1 cup',245,180,12,30,2,'US','vegan','lentil soup,lentils'],
['Sports drink','500 ml',500,120,0,30,0,'*','vegan','sports drink,gatorade,electrolyte'],
['Orange juice','1 cup',248,112,1.7,26,.5,'*','vegan','orange juice,juice'],
['Broccoli, cooked','1 cup',156,55,3.7,11,.6,'US','vegan','broccoli']
]
export const FOODS = ROWS.map((r, i) => ({ id: i, name: r[0], serving: r[1], grams: r[2], kcal: r[3], protein: r[4], carbs: r[5], fat: r[6], country: r[7], diet: r[8], words: r[9].split(',') }))

const NUM = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, half: 0.5 }
const r1 = (v) => Math.round(v * 10) / 10

// Turns "2 chapati, dal, 1 bowl rice and 150g chicken" into food items with amounts.
// Anything it cannot match comes back with `miss: true` so the screen can ask for it by hand.
export function parseMeal(text, country = 'IN') {
  const list = [...FOODS.filter((f) => f.country === country || f.country === '*'), ...FOODS.filter((f) => f.country !== country && f.country !== '*')]
  return text.toLowerCase().split(/,|\n|\+|&|\band\b|\bwith\b/).map((s) => s.trim()).filter(Boolean).map((raw) => {
    let s = raw, qty = 1, grams = null, m
    if ((m = s.match(/^(\d+(?:\.\d+)?)\s*(?:g|gm|gms|grams|ml)\b\s*(?:of\s+)?(.*)$/))) { grams = +m[1]; s = m[2] }
    else if ((m = s.match(/^(\d+(?:\.\d+)?|a|an|one|two|three|four|five|six|half)\s+(.*)$/))) { qty = NUM[m[1]] ?? +m[1]; s = m[2] }
    let best = null, len = 0
    for (const f of list) for (const w of f.words) if (s.includes(w) && w.length > len) { best = f; len = w.length }
    if (!best) return { raw, miss: true }
    if (grams != null) qty = grams / best.grams
    qty = r1(qty) || 1
    return {
      raw, qty,
      name: `${qty !== 1 ? qty + ' x ' : ''}${best.name}`,
      serving: best.serving,
      kcal: Math.round(best.kcal * qty), protein: r1(best.protein * qty), carbs: r1(best.carbs * qty), fat: r1(best.fat * qty),
    }
  })
}
