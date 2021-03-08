'use strict'

const db = require('../server/db')
const {User, Product, Cart, Review} = require('../server/db/models')

const productData = [
  {
    name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: 'men clothing',
    imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
  },
  {
    name: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: 'men clothing',
    imageUrl:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'
  },
  {
    name: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: 'men clothing',
    imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
  },
  {
    name: 'Mens Casual Slim Fit',
    price: 15.99,
    description:
      'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
    category: 'men clothing',
    imageUrl: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg'
  },
  {
    name:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: 'jewelery',
    imageUrl: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg'
  },
  {
    name: 'Solid Gold Petite Micropave ',
    price: 168,
    description:
      'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
    category: 'jewelery',
    imageUrl: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg'
  },
  {
    name: 'White Gold Plated Princess',
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: 'jewelery',
    imageUrl: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg'
  },
  {
    name: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
    price: 10.99,
    description:
      'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
    category: 'jewelery',
    imageUrl: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg'
  },
  {
    name: 'WD 2TB Elements Portable External Hard Drive - USB 3.0 ',
    price: 64,
    description:
      'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system',
    category: 'electronics',
    imageUrl: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg'
  },
  {
    name: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    price: 109,
    description:
      'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',
    category: 'electronics',
    imageUrl: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg'
  },
  {
    name:
      'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
    price: 109,
    description:
      '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.',
    category: 'electronics',
    imageUrl: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg'
  },
  {
    name:
      'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: 'electronics',
    imageUrl: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg'
  },
  {
    name: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
    price: 599,
    description:
      '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz',
    category: 'electronics',
    imageUrl: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg'
  },
  {
    name:
      'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ',
    price: 999.99,
    description:
      '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag',
    category: 'electronics',
    imageUrl: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg'
  },
  {
    name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates',
    category: 'women clothing',
    imageUrl: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg'
  },
  {
    name:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      '100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON',
    category: 'women clothing',
    imageUrl: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg'
  },
  {
    name: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
    price: 39.99,
    description:
      "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    category: 'women clothing',
    imageUrl: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg'
  },
  {
    name: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 9.85,
    description:
      '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
    category: 'women clothing',
    imageUrl: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg'
  },
  {
    name: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    description:
      '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
    category: 'women clothing',
    imageUrl: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg'
  },
  {
    name: 'DANVOUY Womens T Shirt Casual Cotton Short',
    price: 12.99,
    description:
      '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
    category: 'women clothing',
    imageUrl: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg'
  }
]

const newElectronicsData = [
  {
    name: 'Apple AirPods with Charging Case',
    price: 124.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_da2035e3-ba06-430c-bae4-c3108d02e48f',
    category: 'electronics',
    description:
      'The new AirPods deliver the wireless headphone experience, reimagined. Just pull them out of the charging case and they’re ready to use with your iPhone, Apple Watch, iPad, or Mac. Powered by the all-new Apple H1 headphone chip, AirPods use optical sensors and motion accelerometers to detect when they’re in your ears. Whether you’re using both AirPods or just one, the H1 chip automatically routes the audio and engages the microphone. And when you’re on a call or talking to Siri, an additional speech-detecting accelerometer works with beamforming microphones to filter out external noise and focus on the sound of your voice.',
    reviews: [
      {
        title: 'DEFINATELY RECOMEND',
        submissionTime: '2020-12-15T10:01:27+0000',
        reviewText:
          'I should have bought these AirPods a long time ago. Back then I would buy cheap knock off air phones but I finally caved in and bought air pods and they have changed my life. They are clear sound and a very good loud volume. They are perfect for calls. They charge very fast and they are very quick and easy to connect to your phone. If you are looking for wireless earbuds I recommend that you purchase these because they will revolutionize your daily life. Thank you so much.',
        rating: 5,
        totalFeedbackCount: 33,
        totalPositiveFeedbackCount: 33,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Sound Quality Is Meh',
        submissionTime: '2020-08-17T19:15:38+0000',
        reviewText:
          'These are my second time buying them, because overall they’re alright. However I keep experiencing the same issue, one earbud will give out or the sound quality weakens. I don’t know what is that I’m doing but one always gives out on me. It’s starting to become annoying. I think I’m going to try to the AirPods Pro and see if that makes a difference.',
        rating: 2,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Duracell Coppertop AA Batteries - 10 Pack Alkaline Battery',
    price: 9.49,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_9f50ae8c-fd8c-47d7-9725-eb173acabd8e',
    category: 'electronics',
    description:
      "Duracell Coppertop AA Batteries provide dependable, trusted power to your household devices. From storm season to medical needs to the holidays, Duracell is the #1 trusted battery brand so you know it's a battery you can trust. With a guarantee of 10 years (5 years for 9V batteries) in storage, you can rest assured that they'll be ready when you need them. Crafted and infused with triple corrosion protection, safely use for flashlights and camping lanterns, clocks and radios, remote controls, toys, and other items you use on a daily basis. Duracell 1.5 volt Coppertop batteries are available in AA, AAA, C, D, and 9V sizes. Duracell guarantees these batteries against defects in material and workmanship. Should any device be damaged due to a battery defect, we will repair or replace it at our option.",
    reviews: [
      {
        submissionTime: '2019-07-09T17:27:21+0000',
        reviewText:
          'These batteries are just what I need for children toys.They are long lasting.I have',
        rating: 5,
        totalFeedbackCount: 7,
        totalPositiveFeedbackCount: 7,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: 'Energizer 20pk MAX Alkaline AA Batteries',
    price: 15.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_bca4254b-a9df-4614-b4f5-96a2723ce7d3',
    category: 'electronics',
    description:
      "Power the devices you love with Energizer MAX Alkaline AA Batteries. These Energizer batteries fuel the technology that helps you live, work and play, whether you need remote batteries, clock batteries, or backup batteries for your child's favorite toys and games. Powerseal Technology protects your devices against damaging leaks for up to two years after these batteries are used. With a shelf life of up to 10 years in storage, these batteries are ready to keep your devices operating when you need them. Depend on the power of Energizer MAX AA Batteries to power your everyday electronics.",
    reviews: [
      {
        title: 'Excellent batteries! Lasts a very long time!!',
        submissionTime: '2020-03-24T00:33:50+0000',
        reviewText:
          'I used these in my daughters remote control robot dog about a month ago and they still give enough battery power as the first day I put them in! They are very long lasting which makes them an incredible value! I will be buying these again and highly recommend these! [This review was collected as part of a promotion.]',
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2018-12-17T00:34:31+0000',
        reviewText:
          'do not know where these were held but the package was wet and batteries all rusty, nasty.',
        rating: 1,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Energizer 10pk MAX Alkaline AA Batteries',
    price: 9.49,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_598dfe3d-2398-4d20-88d5-fbc00b2e8c90',
    category: 'electronics',
    description:
      "Power the devices you love with Energizer MAX Alkaline AA Batteries. These Energizer batteries fuel the technology that helps you live, work and play, whether you need remote batteries, clock batteries, or backup batteries for your child's favorite toys and games. Powerseal Technology protects your devices against damaging leaks for up to two years after these batteries are used. With a shelf life of up to 10 years in storage, these batteries are ready to keep your devices operating when you need them. Depend on the power of Energizer MAX AA Batteries to power your everyday electronics.",
    reviews: [
      {
        title: 'Excellent product.',
        submissionTime: '2017-12-14T19:37:03+0000',
        reviewText: 'Great batteries for every remote that needs batteries.',
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: 'Duracell Coppertop AA Batteries - 20 Pack Alkaline Battery',
    price: 15.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_c690feea-1b83-4744-926e-3358c7672c25',
    category: 'electronics',
    description:
      "Duracell Coppertop AA Batteries provide dependable, trusted power to your household devices. From storm season to medical needs to the holidays, Duracell is the #1 trusted battery brand so you know it's a battery you can trust. With a guarantee of 10 years (5 years for 9V batteries) in storage, you can rest assured that they'll be ready when you need them. Crafted and infused with triple corrosion protection, safely use for flashlights and camping lanterns, clocks and radios, remote controls, toys, and other items you use on a daily basis. Duracell 1.5 volt Coppertop batteries are available in AA, AAA, C, D, and 9V sizes. Duracell guarantees these batteries against defects in material and workmanship. Should any device be damaged due to a battery defect, we will repair or replace it at our option.",
    reviews: [
      {
        title: 'Great battery',
        submissionTime: '2019-09-25T16:05:51+0000',
        reviewText:
          'We always need AA batteries in my house.  They work great. Love the bulk packaging.',
        rating: 5,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2018-12-29T02:56:57+0000',
        reviewText:
          "Some of these batteries didn't last 10 minutes in my kids xbox controllers! Since you are able to see the battery life when put into the controllers, some of them started out at less than half life! I'm thinking maybe they were old. I should have thought to check the expiration dates. I won't be ordering batteries from Target again!",
        rating: 1,
        totalFeedbackCount: 5,
        totalPositiveFeedbackCount: 4,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'AAA Batteries - 10ct - up &#38; up&#8482;',
    price: 8.49,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_946ea52f-2355-47be-b320-3ad11ec74bd7',
    category: 'electronics',
    description:
      "Keep your gadgets, kids' toys and more going strong with the AAA Batteries 10 Count from up & up™. This 10-count pack of AAA batteries is great for  stocking up, and they'll also hold power for up to 10 years in storage, so you can keep them stashed away confident that they'll be ready when you need them. Perfect for keeping on hand for multiple uses around the home, these alkaline batteries require no charging and are ready to use out of the package.<br /><br />100% Satisfaction Guaranteed.",
    reviews: [
      {
        submissionTime: '2019-01-24T02:55:00+0000',
        reviewText: 'They work just fine.',
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: 'Energizer 10pk MAX Alkaline AAA Batteries',
    price: 9.49,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_4213382f-afc2-42f7-b1a3-92a9c1e2752b',
    category: 'electronics',
    description:
      "Power the devices you love with Energizer MAX AAA Alkaline Batteries. These Energizer batteries fuel the technology that helps you live, work and play, whether you need batteries for everyday electronics like your wireless mouse or batteries for your child's toys. Powerseal Technology protects your devices against leaks for up to two years after these Energizer AAA batteries are fully used. With a shelf life of up to 10 years in storage, these batteries keep your devices operating when you need them most. Depend on the power of Energizer MAX AAA Batteries to power your everyday electronics.",
    reviews: [
      {
        title: 'Great batteries',
        submissionTime: '2020-03-10T15:43:32+0000',
        reviewText:
          'I love these batteries. They work great. It made my scale so bright. I honestly will purchase these again. And I definitely will recommend them to friends and family. . [This review was collected as part of a promotion.]',
        rating: 5,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: 'Apple AirPods Pro',
    price: 199.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_ceb2d014-67bd-4e0d-91ae-a888fa220813',
    category: 'electronics',
    description:
      "<br />Active Noise Cancellation for immersive sound. Transparency mode for hearing and connecting with the world around you. A more customizable fit for all-day comfort. Sweat and water resistant.* All in a super light, in-ear headphone that’s easy to set up with all your Apple devices.* It has a rich and vibrant sound quality that gives you the experience you'd expect from AirPods.  <br /><br />* Apple AirPods Pro are sweat and water resistant for non-water sports and exercise and are IPX4 rated. Sweat and water resistance are not permanent conditions. The charging case is not sweat or water resistant.<br /><br />*Requires an iCloud account and macOS 10.14.4, iOS 12.2, iPadOS, watchOS 5.2, or tvOS 13.2 or later.<br /><br />*Siri may not be available in all languages or in all areas, and features may vary by area.<br /><br />*Battery life varies by use and configuration.",
    reviews: [
      {
        title: 'Perfect fit',
        submissionTime: '2020-12-07T02:44:00+0000',
        reviewText:
          "I have very small ears and these are the first earbuds or ear pods to fit at all. They get a nice seal and they stay put. Wore them on a 20 mile bike ride with no issues and usually I'm readjusting my earbuds every few minutes. Love the sound and the noise canceling is just enough to block out the background but still let me hear vehicles coming while riding.",
        rating: 5,
        totalFeedbackCount: 41,
        totalPositiveFeedbackCount: 41,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Not worth the money!',
        submissionTime: '2020-09-01T13:17:06+0000',
        reviewText:
          'Sound is decent IF they actually stay in. They won’t stay in my ears regardless of size of ear piece. They don’t even stay in when sitting still talking on the phone. Every single person I’ve talked to has the same issue. Basic earbuds always fell out but these overpriced higher end model do not. Can’t run or workout in them unless I hold them in. So disappointed. Can’t believe I spent so much on them. They look great, have great features but sound and fit is sorely lacking. Going back to my Beats which is a superior product and you get more for your money! Hopefully I can sell these.',
        rating: 2,
        totalFeedbackCount: 8,
        totalPositiveFeedbackCount: 8,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Duracell Coppertop AAA Batteries - 10 Pack Alkaline Battery',
    price: 9.49,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_67a4a366-b3c5-4af9-b4a0-6b53e12cd18b',
    category: 'electronics',
    description:
      "Duracell Coppertop AAA Batteries provide dependable, trusted power to your household devices. From storm season to medical needs to the holidays, Duracell is the #1 trusted battery brand so you know it's a battery you can trust. With a guarantee of 10 years (5 years for 9V batteries) in storage, you can rest assured that they'll be ready when you need them. Crafted and infused with triple corrosion protection, safely use for flashlights and camping lanterns, clocks and radios, remote controls, toys, and other items you use on a daily basis. Duracell 1.5 volt Coppertop batteries are available in AA, AAA, C, D, and 9V sizes. Duracell guarantees these batteries against defects in material and workmanship. Should any device be damaged due to a battery defect, we will repair or replace it at our option.",
    reviews: [
      {
        title: "They're batteries! They work! Plain and simple.",
        submissionTime: '2020-11-13T18:48:59+0000',
        reviewText: 'The price is good for this package.',
        rating: 5,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Leaking AAA Batteries',
        submissionTime: '2020-05-27T14:39:01+0000',
        reviewText:
          "I've had several AAA batteries leak without even being used. The latest battery to fail has a date of Dec 2025. I used to think that the Duracell brand was the best on the market but not anymore. The next time I buy batteries I'm switching to Eveready for a test. Unfortunately Eveready batteries are made in China and possibly Duracell are also.",
        rating: 1,
        totalFeedbackCount: 7,
        totalPositiveFeedbackCount: 7,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'AA Batteries - 10ct - up &#38; up&#8482;',
    price: 8.49,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_f7c1b17b-6c98-4351-9dec-0e842dc2e0b5',
    category: 'electronics',
    description:
      "Stay stocked up with the AA Batteries 10 Count from up & up™. This 10-count pack of AA batteries is great for keeping on hand for multiple uses around the home, and the alkaline batteries require no charging and are ready to use out of the package. Perfect for stocking up, they'll also hold power for up to 10 years in storage, so you can keep them stashed away confident that they'll be ready when you need them.<br /><br />100% Satisfaction Guaranteed.",
    reviews: [
      {
        submissionTime: '2019-01-03T19:27:45+0000',
        reviewText:
          'These batteries work great, long lasting, more than usual in a pack and a super reasonable price.',
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Poor quality batteries',
        submissionTime: '2019-11-03T23:35:16+0000',
        reviewText:
          'Usually buy Duracell for my pulse oximeter and the batteries last around 6 months. Thought I would try to see if Target products were comparable. It is now clear why the price difference, these only lasted 5 weeks which negates the savings by expiring much sooner.',
        rating: 1,
        totalFeedbackCount: 8,
        totalPositiveFeedbackCount: 6,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Duracell Coppertop 9V Batteries - 2pk Alkaline Battery',
    price: 7.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_3e7af487-744f-4d79-bc7e-277b60c49601',
    category: 'electronics',
    description:
      "Duracell Coppertop 9V Batteries provide dependable, trusted power to your household devices. From storm season to medical needs to the holidays, Duracell is the #1 trusted battery brand so you know it's a battery you can trust. With a guarantee of 5 years (10 years for AA, AAA, C, and D batteries) in storage, you can rest assured that they'll be ready when you need them. Crafted and infused with triple corrosion protection, safely use for smoke detectors and carbon monoxide detectors, walkie-talkies, clocks, and other items you use on a daily basis. Duracell 1.5 volt Coppertop batteries are available in AA, AAA, C, D, and 9V sizes. Duracell guarantees these batteries against defects in material and workmanship. Should any device be damaged due to a battery defect, we will repair or replace it at our option.",
    reviews: [
      {
        submissionTime: '2020-11-04T15:48:39+0000',
        reviewText:
          'They’re 9volt batteries. You feed them to the smoke detector to shut it up. The bar is set low.',
        rating: 5,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: 'AA Batteries - 20ct - up &#38; up&#8482;',
    price: 12.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_313f088c-d671-43ab-ab36-60fb7745603e',
    category: 'electronics',
    description:
      "Keep all of your gadgets powered on with the AA Batteries 20 Count from up & up™. This 20-count pack of AA batteries is great for  stocking up, and they'll also hold power for up to 10 years in storage, so you can keep them stashed away confident that they'll be ready when you need them. Perfect for keeping on hand for multiple uses around the home, these alkaline batteries require no charging and are ready to use out of the package.<br /><br />100% Satisfaction Guaranteed.",
    reviews: [
      {
        submissionTime: '2018-12-11T00:25:10+0000',
        reviewText:
          'good value, seem to work well. Using them for my Christmas lights',
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      },
      {
        title: 'terrible',
        submissionTime: '2020-11-06T17:17:33+0000',
        reviewText:
          'Worst batteries I have ever bought. They do not last very long.',
        rating: 1,
        totalFeedbackCount: 5,
        totalPositiveFeedbackCount: 5,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Fujifilm Instax Mini Instant Film Twin Pack - White (16437396)',
    price: 14.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_3135a1de-eaac-4c0f-a6e8-73c4c3ba1d7c',
    category: 'electronics',
    description:
      "Save more memories with the Fujifilm Instax Mini Instant Film Twin Pack - White (16437396). Love your Instax Mini? Now it's even more fun with two rolls of Instax mini film.<br /><br /><br />Shoot crisp images with your Fujifilm instax mini camera using these Fujifilm instax mini instant color film cartridges, which feature direct positive sigma crystal emulsion technology for optimal grain quality.<br /><br />The 41° - 104° temperature range allows you to capture images in a variety of conditions for more shooting! The Fujifilm Instax Mini Instant Film Twin Pack - White (16437396) Will make the perfect gift for your loved one this holiday season!",
    reviews: [
      {
        title: 'This film is great! Works every time without failure.',
        submissionTime: '2016-05-12T06:22:14+0000',
        reviewText:
          "I'm hooked on this film now. It's so cheap with price matching, but even without price matching it's still not bad. This film has yet to fail me. The results are consistent and fun. For the adventurous ones, you can use this in a Polaroid 545 back with a custom film holder made of card stock or use it in a medium format camera and use an Instax camera to process the film with its rollers. (I recommend Instax Wide for the 4x5 cameras.) The high ISO doesn't mute the colors much and the size is actually perfect. Also, for those using Polaroid 300 cameras, the Polaroid branded film is just Fuji Instax mini film. You can use the Fuji Instax film instead and not have to pay the high price Polaroid ends up charging perhaps due to licensing costs. (If you check your Polaroid 300 film box, it will say made in Japan...really, it's made by Fuji but Polaroid pays to sell it under its name.) Fantastic film, great results every time. Addicting.",
        rating: 5,
        totalFeedbackCount: 42,
        totalPositiveFeedbackCount: 41,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Frustrated',
        submissionTime: '2019-03-04T16:59:55+0000',
        reviewText:
          'I ordered this for my daughter and 4 out of the 10 photos in the package turned out blank. She was using correctly and this is quiet frustrating seeing the film is quite expensive.',
        rating: 1,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Energizer 20pk MAX Alkaline AAA Batteries',
    price: 15.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_a7cb9fac-c39e-4b42-bd35-611ceb3d057b',
    category: 'electronics',
    description:
      "Power the devices you love with Energizer MAX AAA Alkaline Batteries. These Energizer batteries fuel the technology that helps you live, work and play, whether you need batteries for everyday electronics like your wireless mouse or batteries for your child's toys. Powerseal Technology protects your devices against leaks for up to two years after these Energizer AAA batteries are fully used. With a shelf life of up to 10 years in storage, these batteries keep your devices operating when you need them most. Depend on the power of Energizer MAX AAA Batteries to power your everyday electronics.",
    reviews: [
      {
        title: 'needed these for my daughters insulin pump',
        submissionTime: '2016-04-09T03:34:15+0000',
        reviewText: 'These were the best buy for my daughter',
        rating: 5,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2018-12-08T18:58:45+0000',
        reviewText: 'They didnt make it into my shipment',
        rating: 1,
        totalFeedbackCount: 8,
        totalPositiveFeedbackCount: 1,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'AAA Batteries - 20ct - up &#38; up&#8482;',
    price: 12.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_53ecf867-d779-45da-bf8b-76ad781e8d5b',
    category: 'electronics',
    description:
      "Make sure you're always powered on with the AAA Batteries 20 Count from up & up™. This 20-count pack of AAA batteries is great for  stocking up, and they'll also hold power for up to 10 years in storage, so you can keep them stashed away confident that they'll be ready when you need them. Perfect for keeping on hand for multiple uses around the home, these alkaline batteries require no charging and are ready to go right out of the gate.<br /><br />100% Satisfaction Guaranteed.",
    reviews: [
      {
        title: 'Great batteries!',
        submissionTime: '2018-12-19T20:19:31+0000',
        reviewText:
          'Why buy name-brand batteries? I guess if you have tons of money, it doesn’t matter. However, I am on a budget. These batteries work just as well as the big names.',
        rating: 5,
        totalFeedbackCount: 7,
        totalPositiveFeedbackCount: 7,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Batteries dead out of box',
        submissionTime: '2020-05-18T18:46:18+0000',
        reviewText:
          "More than half of the 20 pack of batteries doesn't work.  I think I have used 9 and the rest are all dead (i have tried them on multiple devices and compared to batteries that do work.",
        rating: 1,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Duracell Coppertop AAA Batteries - 20 Pack Alkaline Battery',
    price: 15.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_dc4106c8-7805-48f4-a415-6af07275d3d6',
    category: 'electronics',
    description:
      "Duracell Coppertop AAA Batteries provide dependable, trusted power to your household devices. From storm season to medical needs to the holidays, Duracell is the #1 trusted battery brand so you know it's a battery you can trust. With a guarantee of 10 years (5 years for 9V batteries) in storage, you can rest assured that they'll be ready when you need them. Crafted and infused with triple corrosion protection, safely use for flashlights and camping lanterns, clocks and radios, remote controls, toys, and other items you use on a daily basis. Duracell 1.5 volt Coppertop batteries are available in AA, AAA, C, D, and 9V sizes. Duracell guarantees these batteries against defects in material and workmanship. Should any device be damaged due to a battery defect, we will repair or replace it at our option.",
    reviews: [
      {
        submissionTime: '2017-11-23T15:31:25+0000',
        reviewText: 'Works great! Best Batteries',
        rating: 5,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Leaking AAA Batteries',
        submissionTime: '2020-05-27T14:39:01+0000',
        reviewText:
          "I've had several AAA batteries leak without even being used. The latest battery to fail has a date of Dec 2025. I used to think that the Duracell brand was the best on the market but not anymore. The next time I buy batteries I'm switching to Eveready for a test. Unfortunately Eveready batteries are made in China and possibly Duracell are also.",
        rating: 1,
        totalFeedbackCount: 7,
        totalPositiveFeedbackCount: 7,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Apple Wired EarPods with Lightning Connector',
    price: 19.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_b02b4c7d-da3c-4857-92f4-ed5508ed6db5',
    category: 'electronics',
    description:
      'These Apple Wired Earpods with Lightning Connectors are especially designed with rubberized earbuds for a snug and comfy fit. The built-in speakers are engineered to maximize the sound output with a deeper bass while minimizing loss of sound. The hassle-free controls help regulate the volume and audio, and also allow receiving and ending of calls with a simple pinch of the cord.',
    reviews: [
      {
        title: 'Perfect',
        submissionTime: '2020-09-22T16:37:23+0000',
        reviewText:
          'I wanted a second pair of these headphones so I could keep one in my car and one in my house. They work perfectly & are the best headphones to use for anyone with an iPhone 7 or later (I have an iPhone 11)',
        rating: 5,
        totalFeedbackCount: 18,
        totalPositiveFeedbackCount: 18,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Short lifespan!',
        submissionTime: '2020-12-23T22:28:01+0000',
        reviewText:
          'These stopped working after 3 months - tried on both iPhone and iPad and they just weren’t connecting.',
        rating: 1,
        totalFeedbackCount: 9,
        totalPositiveFeedbackCount: 7,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Duracell Coppertop AA Batteries - 6 Pack Alkaline Battery',
    price: 6.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_0f49aaf4-04ff-4868-aaaa-98100dcf1015',
    category: 'electronics',
    description:
      "Duracell Coppertop AA Batteries provide dependable, trusted power to your household devices. From storm season to medical needs to the holidays, Duracell is the #1 trusted battery brand so you know it's a battery you can trust. With a guarantee of 10 years (5 years for 9V batteries) in storage, you can rest assured that they'll be ready when you need them. Crafted and infused with triple corrosion protection, safely use for flashlights and camping lanterns, clocks and radios, remote controls, toys, and other items you use on a daily basis. Duracell 1.5 volt Coppertop batteries are available in AA, AAA, C, D, and 9V sizes. Duracell guarantees these batteries against defects in material and workmanship. Should any device be damaged due to a battery defect, we will repair or replace it at our option.",
    reviews: [
      {
        title: 'Phenomenal Batteries',
        submissionTime: '2016-12-16T02:59:36+0000',
        reviewText:
          'Duracell batteries are great They last long Highly recommend to anyone who is looking for a good price on batteries',
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      }
    ]
  }
]

const newMenClothingData = [
  {
    name: "Men's Hanes&#174; Red Label 8pk Crew Socks With FreshIQTM",
    price: 10.79,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_2c8141a8-4ab4-426e-aa8f-2147347a7adb',
    category: 'men clothing',
    description:
      "The Hanes Men's Crew Socks come in a convenient pack of 8 pairs. Made from super soft blended fabric, these mens socks provide all day lasting comfort. They also feature a full cushioned sole for added support. The reinforced heel and toe deliver added durability. Cool DRI technology wicks moisture away to keep your feet dry. FreshIQ Advanced Odor Protection technology helps reduces unpleasant odors and keeps your feet fresh. Available in a black pack and a white pack, sizes 6-12.",
    reviews: [
      {
        title: 'Worth the price',
        submissionTime: '2014-02-06T05:00:33+0000',
        reviewText:
          'Straightforward socks that I got for my boyfriend. They are worth the price and exactly what you expect from socks. They fit well and my boyfriend really likes them!',
        rating: 5,
        totalFeedbackCount: 12,
        totalPositiveFeedbackCount: 12,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Quality has really declined!',
        submissionTime: '2016-05-03T11:57:11+0000',
        reviewText:
          "I have been buying these socks from Hanes for my husband for over 15 years - they were always great quality and very cushiony on the foot part. This last batch was clearly much reduced in quality - very thin throughout and just cheaply made. When I got them I threw them in the wash without inspecting them so I didn't notice the quality until pulling them out of the dryer. Otherwise I would have returned them! I don't have high hopes for them lasting... but when the time comes to replace them I won't be buying Hanes again.",
        rating: 1,
        totalFeedbackCount: 10,
        totalPositiveFeedbackCount: 10,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Hanes Premium Men's Xtemp Ultra Cushion 6pk Ankle Socks - 6-12",
    price: 14.79,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_697ccd12-b553-4c65-b362-6e0d0a4afc1a',
    category: 'men clothing',
    description:
      "The Hanes Premium Men's X-Temp Ankle Socks come in a convenient 6pk. Featuring X-Temp technology, these socks adapt to your body temperature, keeping your feet dry, cool and comfortable. These ankle length socks wick moisture away from your skin and with all over cushioning, you'll never want to take them off. Best of all, they have our Comfort Toe seam, which is our most comfortable seam ever. Available in a black pack and a white pack, sizes 6-12.",
    reviews: [
      {
        title: 'Great Sturdy Sock.  Stands up well.',
        submissionTime: '2019-10-09T16:16:04+0000',
        reviewText:
          'They are a nice thicker sock which is great.  Gives some cushion when walking on hardwood floors.  My son loves these.  Had to return this particular one for the no see socks but same brand just different style.  They have held up very well.  They show no signs of wearing thin.  We are going on three months now.',
        rating: 5,
        totalFeedbackCount: 7,
        totalPositiveFeedbackCount: 6,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Inconsistent materials',
        submissionTime: '2021-01-05T17:05:33+0000',
        reviewText:
          'Description is wrong. The materials are wildly different on each pack. The last one that I received was 97% polyester, which makes them 100% trash.',
        rating: 1,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Men's Odor Resistant Crew Socks 10pk - Goodfellow & Co™ 6-12",
    price: 9.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_9ca41f43-e73d-47d7-bd79-6bc80c747f4b',
    category: 'men clothing',
    description:
      'Refresh your sock drawer with this 10-Pack of Antimicrobial-Resistant Athletic Crew Socks from Goodfellow & Co&#153;. These classic crew socks are soft and comfortable, offering a great go-to for the gym, office and home alike. And because the antimicrobial fabric helps cut down on odor, your shoes, hamper &mdash; and significant other &mdash; will thank you.',
    reviews: [
      {
        submissionTime: '2020-11-05T01:22:30+0000',
        reviewText:
          "Thin socks and nothing too special about them. I don't know if it's just because they are new but they do reduce the foot odor I think. The seam can be felt along the toe which is annoying. They are tight around the calf.",
        rating: 4,
        totalFeedbackCount: 7,
        totalPositiveFeedbackCount: 7,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2019-09-20T16:37:03+0000',
        reviewText: 'Too narrow, cut circulation off.',
        rating: 1,
        totalFeedbackCount: 9,
        totalPositiveFeedbackCount: 9,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Hanes Premium Men's X-Temp Ultra Cushion Crew Socks 6pk",
    price: 14.79,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_a534e619-81e9-4117-8598-8d2f30f3b2d9',
    category: 'men clothing',
    description:
      "The Hanes Premium Men's X-Temp Dry Crew Socks come in a convenient 6pk. Featuring X-Temp technology, these socks adapt to your body temperature, keeping your feet dry, cool and comfortable. These crew length socks wick moisture away from your skin and with all over cushioning, you'll never want to take them off. Best of all, they have our Comfort Toe seam, which is our most comfortable seam ever. Available in a black pack and a white pack, sizes 6-12.",
    reviews: [
      {
        title: "May be best socks I've ever had...",
        submissionTime: '2018-07-31T13:48:35+0000',
        reviewText:
          "These are the highest quality socks I have gotten in at least 15 years. I was afraid I would never be able to find good socks again. It seems all the manufacturers were making them really cheaply to last about 10 wears without holes. It was ridiculous. I have been wearing these Premium socks for several months, and not only are they very comfortable and cushiony, but they show no signs of any wear at all. Socks I bought before this would already be wearing out. Also, I was concerned about the fit, because they cover a lot of shoe sizes, but I am size 10, and they feel just fine. Couldn't be happier. I got a package of white and a package of the dark ones, and they are both great.",
        rating: 5,
        totalFeedbackCount: 15,
        totalPositiveFeedbackCount: 15,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Holes in toes',
        submissionTime: '2020-03-13T15:29:19+0000',
        reviewText:
          "Seem like great socks right out of the package, but they get holes in the toe area very quickly. Like they just aren't sewn together very well in the toe. Bummer.",
        rating: 1,
        totalFeedbackCount: 7,
        totalPositiveFeedbackCount: 7,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Hanes Premium Men's X-Temp Breathable Crew Socks 6pk",
    price: 14.79,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_10af49c4-bc26-4e3f-ac40-7d2e57659a09',
    category: 'men clothing',
    description:
      "The Hanes Premium Men's X-Temp Crew Socks come in a convenient 6pk. Featuring X-Temp technology and ventilated mesh, these socks keep your feet dry, cool and comfortable. These crew length socks wick moisture away from your skin and with a cushioned foot bottom, you'll never want to take them off. Best of all, they have our Comfort Toe seam, which is our most comfortable seam ever. Available in a black pack and a white pack, sizes 6-12.",
    reviews: [
      {
        title: 'Hanes socks are awesome',
        submissionTime: '2016-12-29T18:14:58+0000',
        reviewText:
          'I really enjoy these socks. I had researched and asked many of my peers for recommendations of socks to purchase. Many folks had recommended Gold Toe brand socks, however the price for gold toe socks was out of this world, so I instead purchased these hanes socks. I have worn hanes socks for years and like to keep my sock drawer organized and in order. One of the ways to make my busy life easier is to keep all of my socks the same color and the same brand so that matching socks is less of a chore. I reluctantly purchased these socks even though they varied in appearance from the usual hanes socks I used to wear. I am a convert ! these socks are quality socks and do the job right ! Warm feet so far this winter, I am anxiously awaiting to see how they perform in the hot summer months. Thank you Hanes ! and thank you Target for carrying this superior product !',
        rating: 5,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Fast Fail',
        submissionTime: '2020-09-20T20:05:42+0000',
        reviewText:
          'These socks were nice at first. However, after about a month they began to fall apart. We purchased these in late June and we’ve had to throw away almost all of them. Please know that my husband isn’t hard on his things. We’ve never had socks fall apart so quickly. It’s too bad these didn’t last.',
        rating: 1,
        totalFeedbackCount: 6,
        totalPositiveFeedbackCount: 6,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Hanes Premium Men's X-Temp Breathable No Show Socks 6pk - 6-12",
    price: 14.79,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_797f06ed-94f3-48b6-97e1-9965548be3c3',
    category: 'men clothing',
    description:
      "The Hanes Premium Men's X-Temp No Show Socks come in a convenient 6pk. Featuring X-Temp technology and ventilated mesh, these socks keep your feet dry, cool and comfortable. These no show length socks wick moisture away from your skin and with a cushioned foot bottom, you'll never want to take them off. Best of all, they have our Comfort Toe seam, which is our most comfortable seam ever.",
    reviews: [
      {
        title: 'Keep em dry!',
        submissionTime: '2014-12-19T14:49:24+0000',
        reviewText:
          'Few times I have worn these guys I am impressed by their ability to keep my feet dry.',
        rating: 4,
        totalFeedbackCount: 9,
        totalPositiveFeedbackCount: 9,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2020-10-06T15:49:58+0000',
        reviewText:
          'Got these for my hubby who has sweaty feet. Thought that all the features listed such as breathability and temp control would work for him, but he does not like these socks. He said they don’t help with the sweat or heat at all and his feet got sweatier than ever.',
        rating: 1,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Hanes&#174; Men's 6Pk Crew Neck T-Shirt With Fresh IQ - White",
    price: 16.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_fba0b5ef-6fcd-47fd-95d9-19420d66b470',
    category: 'men clothing',
    description:
      "Hanes Men's White Crew Neck Short Sleeve Tees come in a convenient pack of 6. With super soft ComfortSoft fabric, these tees offer everyday, all day comfort from the brand you trust. Hanes Men's undershirts are designed with a Lay Flat Collar and are tagless for added comfort. These Hanes T-Shirts feature FreshIQ advanced odor protection technology that helps reduce unpleasant odors from your clothes. Durable, pre-shrunk cotton fabric fits great wash after wash.",
    reviews: [
      {
        title: 'Super comfy - great value',
        submissionTime: '2013-06-18T20:51:33+0000',
        reviewText:
          'These t-shirts are worth every penny. Very comfortable, high quality and durable. The only t-shirts I buy. Highly recommended.',
        rating: 5,
        totalFeedbackCount: 13,
        totalPositiveFeedbackCount: 13,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Poor quality',
        submissionTime: '2018-06-07T17:45:26+0000',
        reviewText:
          'I’m very frustrated with Haynes at the moment. I have been wearing Haynes undershirts and underwear for decades. On average I buy 20 new white crew neck t-shirts per year. I bought this 6 pack size M. When I put one on, it was incredibly thin & smaller than my older ones. I layed the new one on top of the old one (bought 6 mos ago). The new one is nearly see through & at least an inch narrower through the chest/waist.',
        rating: 1,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name:
      'Hanes Men&#39;s 5pk Comfortsoft Waistband Boxer Briefs with Fresh IQ - M',
    price: 15.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_1bf72a52-2fe6-4d0d-b21f-6913ff5ebc2f',
    category: 'men clothing',
    description:
      "Hanes Men's ComfortSoft Waistband Boxer Briefs come in a convenient pack of 5 pairs. These men's underwear offer everyday, all day comfort. Hanes Tagless boxer briefs offer a No Ride Up fit, so they stay in place, and a fabric-covered ComfortSoft waistband to eliminate pinching and binding. Offered in assorted colors. Available in sizes SM - XL.",
    reviews: [
      {
        title: 'Comfy but not perfect',
        submissionTime: '2020-09-17T23:15:20+0000',
        reviewText:
          'Comfortable and fits well, waistband could be more comfy on the inside though sometimes digs in my skin',
        rating: 4,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      },
      {
        title: 'not soft nor comfortable',
        submissionTime: '2019-12-09T03:12:56+0000',
        reviewText:
          "Bought these because I had purchased a pack in the past that were really comfortable and soft just like the packaging says.  Unfortunately this time around that wasn't the case.  The material was really rough and uncomfortable to wear.  Skip these and try another brand.",
        rating: 2,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name:
      "Men's Standard Fit Short Sleeve Lyndale Crew Neck T-Shirt - Goodfellow & Co&#153;",
    price: 6,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_7cc6a869-8fd4-4b5d-9d8f-45a9da8e2f1c',
    category: 'men clothing',
    description:
      "You'll be full of style and comfort when you put on this Regular Fit Short-Sleeve Crew-Neck T-Shirt from Goodfellow & Co™. This regular-fit short-sleeve tee features a solid color along with a classic crew-neck construction, giving you a touch of timeless style that can easily be paired with a variety of bottoms. Made from a soft, cotton-blend fabric, this solid crewneck tee keeps you comfortable throughout your day and works great as a stand-alone or layering option. Pair it with anything from shorts to chinos to jeans for a versatile look that you're sure to appreciate.",
    reviews: [
      {
        submissionTime: '2019-09-27T16:12:59+0000',
        reviewText:
          'My hubby loves these, they fit true to size and wash well.',
        rating: 5,
        totalFeedbackCount: 9,
        totalPositiveFeedbackCount: 9,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Bacon Neck',
        submissionTime: '2020-11-16T15:59:29+0000',
        reviewText:
          'I wear XL, bought XL & it fits ok. Comfortable through the body. However, the collar folds over & gets “bacon” like after a few hours, so now I only wear these t shirts to the gym. Perhaps wider ribbing at the neck is in order.',
        rating: 2,
        totalFeedbackCount: 10,
        totalPositiveFeedbackCount: 10,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Hanes Men's Crew Super Value Socks 20pk - 6-12",
    price: 18.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_dd898157-04a1-42ce-b724-2c3a48842f7e',
    category: 'men clothing',
    description:
      'The Hanes Men\'s Crew Length Socks come in a super value pack of 20 pairs! This sock is like no other. It\'s lightweight for a "no bulk "experience, yet has heel/toe cushioning for added comfort where it matters. These socks are perfect for your "everyday "shoes and they are made from durable polyester fabric with a hint of spandex for a flexible fit. Zoned cushioning provides added comfort and support. Moisture wicking properties pull moisture away from your skin, keeping your feet dry. Available in a black pack and a white pack, these no show socks fit shoe sizes 6-12. Limited time offer.',
    reviews: [
      {
        submissionTime: '2020-05-13T15:47:10+0000',
        reviewText:
          'Hanes has aways been a good product wears good last a long time',
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Beware',
        submissionTime: '2020-07-19T12:16:11+0000',
        reviewText:
          "I should have read the reviews. beware if you think you're buying the nice hanes socks with the gray toe and heal I've been buying for my husband for a decade, these are NOT them. super thin, run small. I'm hoping I can return them",
        rating: 2,
        totalFeedbackCount: 17,
        totalPositiveFeedbackCount: 17,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Men's Fruit of the Loom Breathable 6pk Crew Socks - 6-12",
    price: 10.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_087eb1a2-170b-4b38-bca6-383fd7c89740',
    category: 'men clothing',
    description:
      "These Breathable Crew Socks from Fruit of the Loom are sure to be your go-to choice every time you step out. This set of six socks come in neutral hues featuring crew-length designs as well as banded cuffs for a sure fit. Made from a soft breathable fabric with a hint of spandex for stretchy comfort, this six pack crew-length sock set provides all-day comfort with ample ventilation for comfortable wear. Complete with cushioned soles that help you feel great on your active days, these men's crew socks are a must-have for your everyday ensembles. ",
    reviews: [
      {
        submissionTime: '2018-08-04T19:01:18+0000',
        reviewText: 'Good cotton socks. A little tight.',
        rating: 4,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Disappointed',
        submissionTime: '2019-05-08T01:26:32+0000',
        reviewText:
          'They seemed ok after the very first wash, but every wash after I would get tons of lint. They would leave several balls in the sock after washing and drying. I have been wearing these socks for 3-4 months now and there are holes in almost all of them. I have thrown most of them away and I’m searching for a new brand to buy. The socks are pretty tight, and stay up on my legs, but leave dents after all day wear.',
        rating: 1,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Toddler Athletic Crew Socks 6pk - Cat & Jack™ Orange/Blue',
    price: 5.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_2fa81cc6-370e-4bf1-bf54-fd51346e4d2f',
    category: 'men clothing',
    description:
      "Keep your young ones warm for the winter with the Toddler Athletic Crew Socks 6pk - Cat & Jack™. Colored orange or blue, there are 6 pairs of socks available in this set. The socks are made from soft blended materials for comfortable wear. Whether they are running around the park or hanging out at home, these athletic crew socks from Cat & Jack™ will keep your little one's feet warm and dry. ",
    reviews: [
      {
        submissionTime: '2020-07-31T15:47:13+0000',
        reviewText:
          'I purchased these for my toddler who wears a 10C-11C in Nike brand shoes. They fit great with room for a shoe size change. They hold their seams and color for what it’s worth (I mean - it is a toddler sock.) I’ll continue purchasing these.',
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Don’t waste your money',
        submissionTime: '2020-04-25T21:23:56+0000',
        reviewText:
          'Garbage socks! Firstly, they shrunk so they’re difficult to get on and they squeeze my little guys legs. Secondly, they all have holes after only a few months of wear! I’ve never owned less quality kids socks.',
        rating: 1,
        totalFeedbackCount: 6,
        totalPositiveFeedbackCount: 6,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Hanes Men's 5pk Boxer Shorts Tartan - Colors May Vary",
    price: 18.69,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_e4058d00-bab4-4c9d-9321-5263d4ad2d3c',
    category: 'men clothing',
    description:
      "Hanes Men's Classic Plaid Woven Boxer Shorts come in a convenient pack of 5 pairs. With the Comfort Flex waistband, these boxers offer everyday, all day comfort. Hanes Tagless design means no scratchy, irritating tag getting you down. These underwear are made with FreshIQ advanced odor protection technology that fights odor-causing bacteria found in your clothes - keeping you feeling fresh throughout the day. Offered in assorted tartan plaids (colors may vary from those pictured). Available in sizes S-XL.",
    reviews: [
      {
        title: 'Comfortable',
        submissionTime: '2018-08-02T16:23:43+0000',
        reviewText: 'True to size, get softer with the first wash. Good buy.',
        rating: 5,
        totalFeedbackCount: 6,
        totalPositiveFeedbackCount: 6,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Poor Quality',
        submissionTime: '2020-06-19T18:11:56+0000',
        reviewText:
          'Had these only for a few months before many had rips and tears. Had other pairs for many years without this problem. Very disappointed in the quality.',
        rating: 1,
        totalFeedbackCount: 6,
        totalPositiveFeedbackCount: 6,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Hanes Premium Men's 10pk Cool Comfort No Show Socks",
    price: 15.79,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_94562a0e-ce1c-4f82-96b1-469a3c398afa',
    category: 'men clothing',
    description:
      "The Hanes Premium Men's No-Show Socks come in a convenient pack of 10 pairs. A perfect match for your athletic shoes, they are made from a soft, durable blend of cotton and polyester. With a reinforced heel-toe for durability and full cushioned sole, these socks will quickly become your favorite athletic socks. They also include a touch of breathable rubber to ensure a secure fit. Available in a black pack and a white pack, these no show socks fit shoe sizes 6-12.",
    reviews: [
      {
        title: 'Cushion bottom',
        submissionTime: '2020-10-16T01:45:52+0000',
        reviewText:
          'Husband loves these socks. He says they have a nice comfortable “cushion” to them. They fit his size 10.5 feet well and are nice no show socks for the price',
        rating: 5,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'POSITIVE'
      },
      {
        title: 'False advertising',
        submissionTime: '2018-09-13T17:29:58+0000',
        reviewText:
          'Description says Material: 98% Cotton, 1% Spandex and 1% Nylon. Actually 98% poly. Waste of my time, I now have to go back to store to return! Change the description!!!',
        rating: 1,
        totalFeedbackCount: 7,
        totalPositiveFeedbackCount: 7,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Hanes Men's 8pk Ankle Socks With FreshIQ",
    price: 10.79,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_a53d4315-8538-427a-8944-7af3960ad05a',
    category: 'men clothing',
    description:
      "The Hanes Men's Ankle Length Socks come in a convenient pack of 8 pairs. Made from super soft, blended fabric, these mens socks provide all day lasting comfort. They also feature a full cushioned sole for added support. The reinforced heel and toe deliver added durability and Cool DRI technology wicks moisture away to keep your feet dry. FreshIQ Advanced Odor Protection technology helps reduces unpleasant odors and keeps your feet fresh. Available in a black pack and a white pack, sizes 6-12.",
    reviews: [
      {
        submissionTime: '2019-03-31T17:23:31+0000',
        reviewText:
          'I hate to recommend anything, but after my 3 hospital stay I got used to wearing those socks you get and decided to wear ankle socks always. So I bought these socks quite awhile back and they worked just fine. I thought you would be able to buy these forever (WRONG) they disappeared and nothing compares to them. Suddenly there they were, l ordered them immediately and they were my good old ankle socks. So I ordered probably enough to last till they throw dirt in my face. If you want ankle socks theses are the ones.',
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Did not knock my socks off.',
        submissionTime: '2020-01-16T20:22:59+0000',
        reviewText:
          "I never write reviews, but I had to leave my thoughts on these socks. The socks get holes so fast it's insanity. I get holes after two to three wears. They're decent price, but I'll be looking for better quality at my next sock purchase... Which will unfortunately be very soon.",
        rating: 2,
        totalFeedbackCount: 13,
        totalPositiveFeedbackCount: 13,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Men's Odor Resistant Socks 6pk - Goodfellow & Co™ - 6-12",
    price: 10.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_729f859e-5b85-4ec1-98fe-1d7ee41dbcca',
    category: 'men clothing',
    description:
      'Practical in design and ultra comfy for everyday wear, these Antimicrobial Resistant Athletic Socks from Goodfellow & Co&#153; are a must-have in your sock drawer. These crew socks are comfortable and stretchy, thanks to a soft cotton-blend construction with convenient venting that makes for a breathable fit. Arch support and a reinforced heel and toe add to the comfort, while the antimicrobial construction helps keep sweat and odor at bay &mdash; perfect for workouts or whenever the temps are high.',
    reviews: [
      {
        submissionTime: '2020-10-18T20:23:24+0000',
        reviewText:
          'These are some of our favorite socks in our household. They are soft and have the perfect amount of stretch. These are unique from other socks because they have a mesh-like area along the top of the foot which keeps your feet aerated. The material is soft to begin with but gets softer after washing. They are sturdy and work especially well for exercising and running. We own several other varieties of socks from this brand and this is a great addition. The mesh part really keeps your feet from overheating and sweating especially if you’re in closed-toed shoes all day.',
        rating: 5,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Too small and really tight',
        submissionTime: '2018-11-27T18:30:43+0000',
        reviewText:
          'Way too tight on ankles...these are supposedly made for a man up to size 12 and I am a skinny lady size 9 shoe, and I had to return them because they are so small.',
        rating: 1,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Toddler Girls' Tuff Cuff Socks 6pk - Cat & Jack™ Blue/Pink",
    price: 5.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_c343f37e-532d-43de-85b8-0d4c9dd28983',
    category: 'men clothing',
    description:
      "Keep your young ones warm for the winter with the Toddler Girls' Tuff Cuff Socks 6pk - Cat & Jack™. Brightly colored blue or pink, there are 6 pairs of socks available in this set. The socks are made from soft blended materials for comfortable wear. Whether they are running around the park or hanging out at home, these turnback cuff socks from Cat & Jack™ will keep your little one's feet warm and dry. ",
    reviews: [
      {
        submissionTime: '2020-11-18T02:19:24+0000',
        reviewText:
          'My daughter is 3 1/2, but wearing a 4T-5T and size 10 shoe. These fit her really well, and are a good deal as we transition from summer shoes to winter shoes.',
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Very small',
        submissionTime: '2021-02-03T14:48:13+0000',
        reviewText:
          'These run very small. The fabric has very little stretch. My kid wears Toddler sizes 8 and 9 shoes. The 4T/5T socks were too tight.',
        rating: 2,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'NEGATIVE'
      }
    ]
  }
]

const newWomenClothingData = [
  {
    name:
      'Women&#39;s Cow Low Cut Socks - Xhilaration&#8482; Heather Gray 4-10',
    price: 1.5,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_1aead758-7d09-413f-882e-568b0e9224f0',
    category: 'women clothing',
    description:
      "Whether you’re in a good moo or a bad moo, you’ll surely be seen and herd in these Cow Low Cut Socks from Xhilaration™. Showcasing an allover print of a happy cow smiling as well as chewing on grass for a sweet, whimsical touch, these women's heather gray socks with purple detailing add a cheerful, colorful touch to your sock drawer. Crafted from a soft fabric with a hint of spandex for stretchy comfort, these women’s printed socks are sure to keep you feeling cozy while bringing a fun, unique vibe to your ensemble. <br /><br />We designed this product using at least 20% recycled polyester (excluding trimmings, ornamentation, interlinings, and linings; see below for full fiber content), a fabric that’s created by turning old plastic into new polyester fibers. Making products with recycled polyester helps prevent plastic waste from ending up in landfills — another way we’re committed to promoting sustainability.",
    reviews: [
      {
        title: 'So cute',
        submissionTime: '2021-01-20T21:41:33+0000',
        reviewText:
          'These are sooo cute and stretchy they literally make my day whenever I wear them! Very comfortable and don’t silde around in my shoes. I got the penguin, panda and cow patterns and they’re all good quality, they pilled a little at the heel but overall I really like them',
        rating: 5,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name:
      'Women&#39;s Rainbow with Fuzzy Clouds Low Cut Socks - Xhilaration&#8482; Oatmeal Heather 4-10',
    price: 1.5,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_14176908-90d1-47c8-bad8-679c4ce713aa',
    category: 'women clothing',
    description:
      "These Rainbow with Fuzzy Clouds Low Cut Socks from Xhilaration™ update your sock collection in sweet, fun style. Showcasing a sweet allover print of a rainbow sitting on white clouds with fuzzy accents for whimsical flair, these women's heather socks add a cheerful, colorful touch to your sock drawer. Crafted from a soft fabric with a hint of spandex for stretchy comfort, these women’s printed socks are sure to keep you feeling cozy while bringing a fun, unique vibe to your ensemble.<br /><br />We designed this product using at least 20% recycled polyester (excluding trimmings, ornamentation, interlinings, and linings; see below for full fiber content), a fabric that’s created by turning old plastic into new polyester fibers. Making products with recycled polyester helps prevent plastic waste from ending up in landfills — another way we’re committed to promoting sustainability.",
    reviews: [
      {
        title: 'CUTE',
        submissionTime: '2020-07-03T08:34:38+0000',
        reviewText:
          "I can write night and day about how these are currently my favorite pair of socks but the more important thing is that these are quite comfortable! The clouds on the rainbows are puffy, but they don't make the socks feel very different. For someone who likes a bit of stimming, these are fun to have on your feet. The different textures are nice to touch. The colors are bright, they're well-made, and for the price? A steal! AND you have fluffy rainbow clouds on your feet. There's nothing to complain about unless you don't like having fluffy rainbow clouds on your feet.",
        rating: 5,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Too tight',
        submissionTime: '2020-10-03T02:47:17+0000',
        reviewText:
          'I wanted to love these so I could buy more of the sock designs from this brand. But they are too tight. They cause discomfort within seconds of putting them on. I wish there was a larger/looser size option.',
        rating: 2,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 1,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Women&#39;s Otter Low Cut Socks - Xhilaration&#8482; Blue 4-10',
    price: 1.5,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_3ae06743-e9c2-4832-809a-624beb84899a',
    category: 'women clothing',
    description:
      "From everyday errands to spending lazy afternoons in the backyard, feel comfy and stylish in these Blue Otter Low-Cut Socks from Xhilaration™. Showcasing a motif of a cute floating otter amidst cool blue waves, these women's printed socks with fuzzy detailing add a whimsical touch to your sock drawer. Crafted from a soft fabric with a hint of spandex for stretchy comfort, these blue low-cut socks are sure to keep you feeling cozy while bringing a fun, unique vibe to your ensembles.",
    reviews: [
      {
        title: 'cute',
        submissionTime: '2021-01-12T19:48:30+0000',
        reviewText:
          'very cute and comfy. they are a little thin but was expected.',
        rating: 5,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name:
      'Women&#39;s &#34;Drop It Like A Sloth&#34; Low Cut Socks - Xhilaration&#8482; White 4-10',
    price: 1.5,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_e6d3fbf5-7842-4217-9445-870d5d54075e',
    category: 'women clothing',
    description:
      'You’ll love hanging out with your friends wearing these "Drop it Like a Sloth" Low-Cut Socks from Xhilaration™. Showcasing a motif of dancing sloths holding leaves alongside the text “Drop it Like a Sloth” printed in bright green for whimsical flair, these women\'s white socks with gray detailing add a cheerful, colorful touch to your sock drawer. Crafted from a soft fabric with a hint of spandex for stretchy comfort, these women’s printed socks are sure to keep you feeling cozy while bringing a fun, unique vibe to your ensembles. Plus, they make a great  gift for those who enjoy the slow and adorable pace of sloths. ',
    reviews: [
      {
        title: 'Fun socks, great fit',
        submissionTime: '2020-10-07T14:45:59+0000',
        reviewText:
          'Fun socks! I have big feet (women’s 11) and most of these fun novelty type socks don’t fit well or stay on my feet. These are a great fit, and don’t have to stretch to the point of distorting the design. No complaints!',
        rating: 5,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name:
      "Women's Short Sleeve V-Neck T-Shirt - Universal Thread™ Heather Gray",
    price: 8,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_c0c52403-026d-46a8-bb32-b01195501ecd',
    category: 'women clothing',
    description:
      "From laid-back days at home to laid-back days at work, you'll take on the day in cool, comfy style with this Short-Sleeve V-Neck T-Shirt from Universal Thread™. The relaxed fit tee is crafted from lightweight fabric to keep you in breathable comfort throughout the day, while the V-neckline lends a sleek finish. Boasting an allover heathered finish for a stylish look, this V-neck tee is easy to pair with any style of bottoms in your closet. ",
    reviews: [
      {
        title: 'Good T at a great price',
        submissionTime: '2020-09-06T14:59:54+0000',
        reviewText:
          'These T shirts are quite good for the price, they fit well and have good length to them unlike a lot of T shirts. The V neck is not too high and not too low. I did find that the white runs a little smaller and that the lavender was not colorfast. I find Heather gray to be most comfortable and bought several for sleeping and around the house. For the price they are absolutely worth a try, and seem to go on sale pretty often.',
        rating: 4,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: "Fashion Forms Women's Breast Petals Nude - 3 Pack",
    price: 6.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_eeee93a1-d49e-4903-bcff-ad61d7dc7b4d',
    category: 'women clothing',
    description:
      'Pair these petals with lingerie or clothing for extra coverage and a smooth look. For maximum comfort, make sure to keep the soft, padded center in place when applying. This item works best when applied to clean, dry skin that is free of deodorants, perfumes, lotions, or powders. These can be applied after the product is adhered to the skin.<br>Instructions For Removal: Use a small amount of baby oil and apply around the edges of the petals with a cloth. The baby oil should allow the medical grade adhesive to release from the skin before your Petals can be slowly removed.<br>We recommend that you perform a skin test 24 hours before extended use by wearing the Petals for up to four hours. If you experience any itching, irritation, burning or discomfort of any kind, remove the silicone immediately. Do not use on open cuts, skin disorders, rashes, sun damaged or sunburned skin, white patches or skin depigmentation problems. Even if you have had no previous reaction to this or other similar products, sensitivity may occur. Do not wear overnight, and we recommend that you do not wear it for more than 4-6 hours at a time. Women with a significant amount of melanin or family history of depigmentation may experience skin lightening from the silicone. Not recommended for women with sensitive skin.',
    reviews: [
      {
        title: 'Best pasties I have found!',
        submissionTime: '2014-01-09T17:30:43+0000',
        reviewText:
          "I have not had the same experience as the other customer on here as I think these are wonderful! I have tried to buy less expensive ones but none cover as smoothly as these and I was sad to see that I can't locate them in-store anymore but will buy them on-line. I highly recommend them!",
        rating: 5,
        totalFeedbackCount: 57,
        totalPositiveFeedbackCount: 55,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Pass',
        submissionTime: '2020-06-22T02:27:29+0000',
        reviewText:
          'I used these all last summer and stocked up for this summer again. Unfortunately they’ve changed the material/glue and they don’t work nearly as well. The ones I used last year went on easily without any air pockets. These updated ones leave 2-3 air pockets and take awhile to smooth out, if they do at all. You can see the air pockets through my shirt, which defeats the purpose. Tonight I removed one and it ripped part of my skin off and burned. Not sure why they changed them, but they shouldn’t have. Won’t be purchasing again.',
        rating: 1,
        totalFeedbackCount: 7,
        totalPositiveFeedbackCount: 7,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Women's High-Waisted Pocket Leggings - Wild Fable™",
    price: 16,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_ffe5d3c8-b0b4-4108-8c66-b1e268fe9a6b',
    category: 'women clothing',
    description:
      'High-rise leggings made from a soft fabric with a slim-fit silhouette for comfortable wear, complete with banded cuffs lending a snug fit. Fitted with front patch pockets for functional flair, as well as an adjustable drawstring waistband for a secure fit.',
    reviews: [
      {
        title: 'Perfect for petite!',
        submissionTime: '2021-01-31T17:31:12+0000',
        reviewText:
          'Finally a pair of joggers that I can wear out and still look put together. For reference, I’m 5’ 1” and 110 lbs and usually wear an xs. However , since I wanted this to fit more like a jogger than a legging, I sized up and it’s perfect !! Buying other colors !',
        rating: 5,
        totalFeedbackCount: 29,
        totalPositiveFeedbackCount: 29,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Runs small',
        submissionTime: '2021-02-03T16:37:40+0000',
        reviewText:
          "These run VERY small. Also the fabric is stretchy but the stitching has zero stretch (especially noticeable in the waist band). I'm usually a size xs-s, 24-25 waist and I couldn't even get these pants up (I ordered a size XS in black). Will be returning.",
        rating: 1,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name:
      'Women&#39;s Sloth&#160;Low Cut Socks - Xhilaration&#8482; Orange 4-10',
    price: 1.5,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_7752a14a-162d-4353-bd38-c8f05d5c037c',
    category: 'women clothing',
    description:
      "You’ll love wearing these Sloth Low Cut Socks from Xhilaration™ when you’re hanging out with friends or just lazing around. Showcasing a smiling brown sloth relaxing on a yellow tube holding a glass and floating against an orange sky for whimsical flair, these women's orange socks add a cheerful touch to your sock drawer. Crafted from a soft fabric with a hint of spandex for stretchy comfort, these women’s printed socks are sure to keep you feeling cozy while bringing a fun vibe to your ensemble. Plus, they make a great gift for those who enjoy the slow and adorable pace of sloths. <br /><br />We designed this product using at least 20% recycled polyester (excluding trimmings, ornamentation, interlinings, and linings; see below for full fiber content), a fabric that’s created by turning old plastic into new polyester fibers. Making products with recycled polyester helps prevent plastic waste from ending up in landfills — another way we’re committed to promoting sustainability.",
    reviews: [
      {
        submissionTime: '2020-11-04T14:50:24+0000',
        reviewText: 'super cute and comfy',
        rating: 5,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: 'Women&#39;s Cat Faces Ankle Socks - Xhilaration&#8482; Peach 4-10',
    price: 2.5,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_cd38b861-67ff-497e-a42e-707400fbb5b9',
    category: 'women clothing',
    description:
      "Stay stylish from head to toe with these high-fashion women's cat ankle casual socks crafted by Xhilaration&#153;.",
    reviews: [
      {
        title: 'Super Comfy!',
        submissionTime: '2018-11-25T08:00:59+0000',
        reviewText:
          'I wear a size 10 in womens and they fit good. Sometimes the socks fit too small and the image looks a little weird, but that didn’t happen with these socks.',
        rating: 5,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2018-12-04T20:59:47+0000',
        reviewText:
          'Cute, but ruined after a single wash! Would not recommend.',
        rating: 2,
        totalFeedbackCount: 5,
        totalPositiveFeedbackCount: 4,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name:
      'Women&#39;s Multipattern 6pk Crew Socks - A New Day&#8482; Black 4-10',
    price: 9,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_02ec8927-8ebd-4c82-a678-b2dedafae236',
    category: 'women clothing',
    description:
      "With the Novelty Crew Socks from A New Day™, you'll always be ready to take on your day in style. This pack comes with six different pairs, so you can go simple with the solid pairs, or add a fun spark with the dotted pairs or striped pairs. Whatever you choose to do, these socks will keep you comfortable whether you pair them with ankle boots or flats.",
    reviews: [
      {
        title: 'Tight',
        submissionTime: '2017-12-21T18:05:19+0000',
        reviewText: 'Good quality, just very tight around the ankles.',
        rating: 4,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Way too small',
        submissionTime: '2019-11-01T02:44:03+0000',
        reviewText:
          "Runs extremely small! These aren't one size fits all in any way. If you're shoe size is bigger than a 7 don't bother. Would love to return but can't because you need to open them to try them on",
        rating: 1,
        totalFeedbackCount: 10,
        totalPositiveFeedbackCount: 10,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Fashion Forms Women's Reusable Silicone Gel Petals",
    price: 8.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_ae70417e-2718-4d82-9727-84e7dfaa6fea',
    category: 'women clothing',
    description:
      'Fear "Headlights"no more! Pair these petals with lingerie or clothing for extra coverage and a smooth look. Protect sensitive areas from rubbing against rough fabrics or showing through sheer fabrics. This item works best when applied to clean, dry skin that is free of deodorants, perfumes, lotions, or powders. These can be applied after the product is adhered to the skin.',
    reviews: [
      {
        title: 'I am so happy to find these!',
        submissionTime: '2015-08-28T03:16:32+0000',
        reviewText:
          'I have been looking for this particular breast petal for over one year. They cover so well and last and last as long as you follow the instructions for wear!',
        rating: 5,
        totalFeedbackCount: 12,
        totalPositiveFeedbackCount: 12,
        reviewType: 'POSITIVE'
      },
      {
        title: 'They stick nicely BUT they are WAY too thick',
        submissionTime: '2015-05-24T01:12:01+0000',
        reviewText:
          "I've had others that were thinner and stuck well so you couldn't tell I had them on under halter tops, etc. BUT THESE are quite a bit thicker stick out like little buttons on your nips and say 'hello' to the world. Does hide the nipple, but looks like a pop cap sticking out. Thinner silicone, please.",
        rating: 2,
        totalFeedbackCount: 66,
        totalPositiveFeedbackCount: 65,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Women&#39;s Daisy 6pk Low Cut Socks - Xhilaration&#8482; Black 4-10',
    price: 6,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_a255fa75-9129-4520-89eb-4f2c90db3ad4',
    category: 'women clothing',
    description:
      'Kick your everyday style up a notch with these classic black snowflakes casual socks designed by Xhilaration™.',
    reviews: [
      {
        title: 'Good thin socks',
        submissionTime: '2018-09-25T17:30:11+0000',
        reviewText:
          'Nice socks. They are thin but that’s what my daughter likes. Would definitely buy more and great price!',
        rating: 5,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      },
      {
        title: 'These slided down into my shoes',
        submissionTime: '2020-07-21T02:30:58+0000',
        reviewText:
          "Cute pattern but they're very thin and they do not stay on my heel when walking.",
        rating: 2,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Women's Short Sleeve Ruched Side Bodycon Dress - Wild Fable™",
    price: 12,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_2fa74233-11fc-491d-b4fd-72c7f6720c2e',
    category: 'women clothing',
    description:
      'Short-sleeve mini dress cut in a form-fitting silhouette. Made from lightweight fabric for comfortable wear. Ruched sides feature adjustable ties for a custom fit and look. Finished with a crew neckline.',
    reviews: [
      {
        title: 'Must have',
        submissionTime: '2021-02-18T02:17:26+0000',
        reviewText:
          'Runs normal size for me. I’m a thicker girl and a large fit fine. I bought every color! Every girl needs a little black dress :)',
        rating: 5,
        totalFeedbackCount: 15,
        totalPositiveFeedbackCount: 15,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Color',
        submissionTime: '2021-02-01T23:25:19+0000',
        reviewText:
          'The color brown is not brown.. it’s more of like a dirty pink color. Disappointed with that.',
        rating: 2,
        totalFeedbackCount: 6,
        totalPositiveFeedbackCount: 6,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: "Women's Beautifully Soft Fleece Lounge Jogger Pants - Stars Above™",
    price: 15,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_01f0f651-86e4-4ce9-a546-036288c224b6',
    category: 'women clothing',
    description:
      "The Beautifully Soft Fleece Lounge Jogger Pants from Stars Above™ offer a balance of cozy comfort and easygoing style, making them the perfect addition to your laid-back loungewear. From unwinding after work to relaxing on off-duty days, you'll love the undeniable comfort of these soft fleece joggers, encompassing a Beautifully Soft fabric for breathable wear and cut in a relaxed silhouette to easily move with you. The drawstring waistband allows you to find your perfect fit for secure wear, and side pockets lend functional flair for stashing your lip balm, phone and other at-home essentials. You can complete your look with a simple T-shirt or sweatshirt, and add a pair of slippers for added warmth.",
    reviews: [
      {
        title: 'Love these!',
        submissionTime: '2020-08-27T15:10:24+0000',
        reviewText:
          'So comfortable and cute too! They do run big. 5\'4", 150lbs and a medium fits perfect.',
        rating: 5,
        totalFeedbackCount: 17,
        totalPositiveFeedbackCount: 17,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Pills quickly',
        submissionTime: '2020-09-13T23:21:52+0000',
        reviewText:
          'These are super comfortable, but after two washes the backside is completely pilled.',
        rating: 2,
        totalFeedbackCount: 18,
        totalPositiveFeedbackCount: 18,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name:
      "Women's Tie-Dye Beautifully Soft Short Sleeve Notch Collar Top and Shorts Pajama Set - Stars Above™",
    price: 21.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_9da02cb4-a394-42c1-a629-2447c387a40d',
    category: 'women clothing',
    description:
      'Complement your everyday style and need for comfort with the Tie-Dye Beautifully Soft Notch-Collar Pajama Set from Stars Above™. This two-piece pajama set comes with a short-sleeve button-down shirt with a notch collar and chest pocket for classic flair, along with a pair of pull-on shorts for a complete look. An allover tie-dye print gives the PJ set a blush of fashion-forward flair, and both pieces are made from our Beautifully Soft fabric to keep you comfy and lend a fresh and light fit through the seasons.. ADULT GARMENT',
    reviews: [
      {
        title: 'True to Size',
        submissionTime: '2021-02-04T14:56:46+0000',
        reviewText:
          'I am a medium in tops, size 6 in bottoms, 140lbs 5’3”. I got these in a medium and they fit true to size. They are not tight and slightly loose. The shorts are a good length, hit a few inches below the bottom of my bum. So, so soft, the softest pajamas ever. The fabric also keeps me cool.',
        rating: 5,
        totalFeedbackCount: 9,
        totalPositiveFeedbackCount: 9,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: 'Women&#39;s Fern 3pk Crew Socks - A New Day&#8482; Black 4-10',
    price: 6,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_f87c9f00-3b0e-42a8-9441-589612607f50',
    category: 'women clothing',
    description:
      "Ideal for adding to a wide variety of ensembles, the Fern Crew Socks from A New Day™ make a versatile addition to your essentials. This pack of socks includes three pairs featuring a playful assortment of stylish stripes, pretty prints and simple solids, and they're crafted from a soft and lightweight fabric with a bit of stretch for all-day comfortable, breathable wear. The white pair brings a touch of the tropics with its fern-foliage print in black, a second pair showcases a diamond-textured pattern in solid black, and the third offers timeless style with its striped pattern in black and white. These crew-cut socks are finished with rib-knit cuffs to give you a secure fit that can be worn with variety of footwear.",
    reviews: [
      {
        title: 'Big fan over here',
        submissionTime: '2019-03-27T16:18:45+0000',
        reviewText:
          "I love these socks! I typically buy ankle socks but these are great for wearing in boots or lounging around the house in. They are really soft and feel durable enough to last more than a few years without getting a hole in them. I like the fern print and I'm tempted to buy all of the other socks from this brand!",
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      },
      {
        title: 'got a hole immediately',
        submissionTime: '2018-12-23T23:47:53+0000',
        reviewText:
          'the black pair immediately developed a hole in the stitching where the heel meets the rest of the sock',
        rating: 1,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'NEGATIVE'
      }
    ]
  }
]

const newJeweleryData = [
  {
    name: 'Open Graduated Size Hoop Earring Set 3ct - Wild Fable&#8482; Gold',
    price: 6,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_c0b1aa19-e2a1-484b-beb0-49e148218f01',
    category: 'jewelery',
    description:
      'Three pairs of open hoop earrings in different sizes. Open construction at the back of the hoop offers easy, comfortable wear. Gold finish brings added shine.',
    reviews: [
      {
        title: 'Stunning Earrings',
        submissionTime: '2020-09-03T15:57:00+0000',
        reviewText:
          'These hoops are SO cute and go with any outfit! They are a little heavy, but are not too bad! I really like them a lot:)',
        rating: 5,
        totalFeedbackCount: 8,
        totalPositiveFeedbackCount: 8,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2020-08-13T00:28:31+0000',
        reviewText:
          'They are HUGE . The picture totally ￼￼fooled me they are not that thin ! Highly upset .',
        rating: 1,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Connoisseurs Precious Jewelry Cleaner',
    price: 4.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_a3552437-7f5e-46ab-ba60-42b28fb77768',
    category: 'jewelery',
    description:
      'Regular use of Connoisseurs Precious Jewelry Cleaner will bring out the brilliance of your gold, platinum, diamonds & precious stone jewelry. Special polymers in our jewelry cleaning formula help to reduce the appearance of tiny scratches in settings. Connoisseurs Precious jewelry cleaner is a good way to clean most metals used in jewelry today.',
    reviews: [
      {
        title: 'Amazing!',
        submissionTime: '2014-11-21T03:10:12+0000',
        reviewText: 'Such a great price and super effective!!!',
        rating: 5,
        totalFeedbackCount: 25,
        totalPositiveFeedbackCount: 25,
        reviewType: 'POSITIVE'
      },
      {
        title: 'don not buy',
        submissionTime: '2019-02-12T15:07:19+0000',
        reviewText: "it didn't clean my jewelry much",
        rating: 1,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Small Hoop Earrings - A New Day&#153;',
    price: 7.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_455c3e3e-ac92-4211-8f1a-5a0e7b61f643',
    category: 'jewelery',
    description:
      'Get a hoop for every occasion with these Small Hoop Earrings from A New Day™. Hinged huggies in three different diameters sport a sleek, squared design that hugs the earlobe for a chic finish. Accent your go-to jeans and a tee look with the tiny pair, or bring on the big hoops to glam up a workday ensemble.',
    reviews: [
      {
        title: 'Love these!',
        submissionTime: '2019-09-17T18:35:46+0000',
        reviewText:
          'I’m very sensitive to “fake” earrings and these haven’t given me any issues! Have worn night and day/ showered with etc and feel great!',
        rating: 5,
        totalFeedbackCount: 6,
        totalPositiveFeedbackCount: 6,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Ouch!',
        submissionTime: '2020-10-03T07:10:46+0000',
        reviewText:
          'So so bad. The post doesn’t fit through my hole. Gauge was way too big. Will be returning.',
        rating: 1,
        totalFeedbackCount: 8,
        totalPositiveFeedbackCount: 8,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Hoop Earring Set 3ct - A New Day&#153;',
    price: 7.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_99a98f2d-1d64-490d-b202-28fe46134562',
    category: 'jewelery',
    description:
      'Whether you want to go big or small, this set of 3-Pairs of Hoop Earrings from A New Day&#153; will let you shine with just the right look that you want. Made with stainless steel, brass and nickel-free metal, these beautifully finished hoop earrings are delicately detailed and come in graduated sizes. The classic and simple look makes them perfect to wear for any occasion and with any outfit. Lightweight and easy to care for, these earrings are secured by a snap post closure for easy wear. Pair any of these metal hoop earrings with your favorite outfits to dress up your everyday look.',
    reviews: [
      {
        submissionTime: '2020-11-20T15:28:09+0000',
        reviewText:
          'High quality, classic hoops! This is one of my closet staples. I have extremely sensitive ears and am allergic to most metals but tolerate these great. Would recommend!',
        rating: 5,
        totalFeedbackCount: 6,
        totalPositiveFeedbackCount: 6,
        reviewType: 'POSITIVE'
      },
      {
        title: "Sadly, just don't!",
        submissionTime: '2017-08-15T16:02:15+0000',
        reviewText:
          "These were the perfect size hoop, however after wearing them only a few times and I mean like twice tops! The metal started to turn. They look like they've been at the bottom of my purse for about 6 years. I would not recommend...super bummed!",
        rating: 1,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name:
      'Flat Geometric Brass and in Worn Gold Post Top Earrings - Universal Thread&#8482; Gold',
    price: 7.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_2aeecefe-d03b-4859-bab1-56d76197053d',
    category: 'jewelery',
    description:
      'Level up your accessory game with the Flat Geometric Brass and in Worn Gold Post Top Earrings from Universal Thread™. Designed with a worn, textured gold finish, this pair of earrings consists of flattened, inverted U-shape charms with a 1.75-inch drop length that makes for subtle movement. The golden arches hang from the flattened disc earpieces and are fitted with simple post back closures for quick and easy wear. Modern and stylish, this pair will complement a range of outfits from jeans and a tee to a sundress or more formal attire.',
    reviews: [
      {
        title: 'Beautiful but fragile?',
        submissionTime: '2020-08-25T03:37:34+0000',
        reviewText:
          "I really love the look of these and for the price, I was excited to add them to my collection! I will say though, they feel pretty fragile and with the track record of some of my previous Target earrings, I'm worried they may just break eventually. But so far they are going strong!",
        rating: 4,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Smaller than expected',
        submissionTime: '2020-02-22T16:10:00+0000',
        reviewText:
          'Good quality, but for this style earring they are comically small.',
        rating: 2,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Multi Parts Rubber Disc Earring Back - A New Day&#8482; Clear',
    price: 4.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_ed38f7c3-29f9-48f9-ad45-dc466fbd9858',
    category: 'jewelery',
    description:
      "Sometimes you fall in love with a pair of earrings only to discover that they're sold without backs &mdash; or, worse, you lose one or both of the backs that your favorite pair of earrings came with. Both dilemmas are solved thanks to these Multi Part Rubber Disc Earring Backs from A New Day&#153;. This variety pack of clear earring backs lets you wear your earrings any way you like, comfortably and with the backing style you prefer. Simply select the silver, gold or clear backs that best match your earrings, fasten to the earring posts and confidently flaunt your studs, tassels or hoops.",
    reviews: [
      {
        title: 'I recommend these back for pierced earrings.',
        submissionTime: '2019-03-06T13:02:41+0000',
        reviewText:
          'I was pleased that I could find replacement backs for my earrings. They have worked out well.',
        rating: 5,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Become loose and fall off',
        submissionTime: '2020-09-06T03:15:19+0000',
        reviewText:
          "The 100% plastic rubber earring backs are constantly falling off. I've lost two 14K gold earrings as a result of this. They don't form a proper seal, become loose after a couple wears, and just pop right off.",
        rating: 2,
        totalFeedbackCount: 7,
        totalPositiveFeedbackCount: 6,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Connoisseurs Silver Jewelry Cleaner',
    price: 4.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_ce516097-2fee-4372-8aed-7820c7e04b3a',
    category: 'jewelery',
    description:
      'Connoisseurs Silver Jewelry Cleaner rejuventates dull or tarnished jewelry in just 10 seconds.   It is a fast, convenient way to clean sterling silver jewelry. Use our Silver Jewelry Cleaner to instantly remove tarnish from sterling silver chains, rings, bracelets and earrings and restore its shine and brilliance.  Ammonia-Free. 8 FL. OZ. (236 ml)',
    reviews: [
      {
        title: 'Best silver cleaner ever!!',
        submissionTime: '2012-08-22T23:34:44+0000',
        reviewText:
          'I only buy this sliver cleaner, you only dip it for 10-20 seconds rinse and jewelry is cean.',
        rating: 5,
        totalFeedbackCount: 60,
        totalPositiveFeedbackCount: 59,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2018-07-19T16:49:44+0000',
        reviewText:
          'Absolutely terrible! Used this cleaner for my rings and it completely ruined them!!',
        rating: 1,
        totalFeedbackCount: 5,
        totalPositiveFeedbackCount: 5,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Gold-Tone Click Top Hoop Earring Set 3pc - Wild Fable&#8482; Gold',
    price: 6,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_54ba5619-6b49-4b07-9811-0b96e24df22c',
    category: 'jewelery',
    description:
      'Earring set includes three pairs with one-inch drop length and different designs featuring either two-circle or three-circle frame for added movement. Nickel-free metal for comfort with most skin types, and click-top closures lend secure wear on pierced ears.',
    reviews: [
      {
        title: 'Cute!',
        submissionTime: '2020-12-14T01:12:46+0000',
        reviewText:
          'Super cute! I have gotten tons of compliments. They’re my go to ratings now!',
        rating: 5,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: 'Hoop Earring Set 3ct - A New Day&#8482; Silver',
    price: 7.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_33daf3db-ab43-4326-ab66-01531c60e588',
    category: 'jewelery',
    description:
      'Whether you want to go big or small, this set of 3-Pairs of Hoop Earrings from A New Day&#153; will let you shine with just the right look that you want. Made with stainless steel, brass and nickel-free metal, these beautifully finished hoop earrings are delicately detailed and come in graduated sizes. The classic and simple look makes them perfect to wear for any occasion and with any outfit. Lightweight and easy to care for, these earrings are secured by a snap post closure for easy wear. Pair any of these silver hoop earrings with your favorite outfits to dress up your everyday look.',
    reviews: [
      {
        title: 'Check to make sure they have matching pairs',
        submissionTime: '2020-10-30T16:32:40+0000',
        reviewText:
          'these are cute but i didnt realize until after I wore them a few times that one pair of the hoops arent the same size. Should have returned them but I didnt have receipt and didnt feel right aboit returning them after i wore them',
        rating: 4,
        totalFeedbackCount: 5,
        totalPositiveFeedbackCount: 5,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2020-07-30T14:24:28+0000',
        reviewText:
          'I had high hopes for these hoops! Unfortunately, they tarnish very easily and hurt my ears!',
        rating: 1,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name:
      'Crystal Acrylic Stones White Pearls Multi Necklace Set - Wild Fable&#8482; Gold',
    price: 10,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_70df085e-bec3-4ce7-b1d6-58e7dbb5c469',
    category: 'jewelery',
    description:
      'Necklace set includes five necklaces for a layered look. Can be worn together or as standalone pieces, each featuring a different design — ranging from faux pearls to acrylic stones and star-shaped pendants.',
    reviews: [
      {
        title: 'Fantastic',
        submissionTime: '2020-10-22T14:13:06+0000',
        reviewText:
          'These are super cute and basic to wear, and match with every outfit! I love the plain one the best and wear it nearly everyday. Just a note some necklace/chokers might run big if you have a small neck like me. But thats perfectly fine since it still looks good overall! Also I have been wearing these necklaces for around a month now and they have not turned green !',
        rating: 5,
        totalFeedbackCount: 5,
        totalPositiveFeedbackCount: 5,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Cute but horrible quality',
        submissionTime: '2020-12-26T07:46:33+0000',
        reviewText:
          'I saw these at the store and thought they were super cute, but when I got home and tried them on I was unfortunately very disappointed. One of the metal loops on the clasp broke off, so it wasn’t even wearable. The necklace with the star charms is supposed to have 3 stars, and mine only has 2. Also, one of the necklaces with a single small gem has something really weird going on with the chain... it’s like there are extra, unnecessary loops in the chain and a random metal piece in there. I’ll attach a picture so you can see what I mean. Lastly, some of the clasps were stuck shut and I thought I was going to break the necklace trying to get it open. I’m really disappointed because they all are so cute but I will definitely be returning them soon... too many issues.',
        rating: 1,
        totalFeedbackCount: 5,
        totalPositiveFeedbackCount: 4,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name:
      'Ball &#38; Medallion in Worn Gold Layer Necklace - Universal Thread&#8482; Gold',
    price: 14.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_6b23589a-c715-4ec2-94b4-3fa1cad26783',
    category: 'jewelery',
    description:
      'The Ball & Medallion in Worn Gold Layer Necklace from Universal Thread™ is a beautiful addition to your jewelry collection. This 16-inch gold-finish chain necklace features two chains sitting atop one another for a lovely cascading effect. The upper box chain is accented with golden balls hanging at regular intervals along the entire length, while the lower cable chain is strung with tiny, cylindrical links in a hammered finish and accented with a medallion charm pendant in textured gold tone for a standout look. This double-layered necklace closes with a lobster-claw clasp at the back, where an extra length of chain makes the length fully adjustable.',
    reviews: [
      {
        submissionTime: '2020-06-23T18:12:09+0000',
        reviewText:
          'I loooove the look of this necklace. I wore It a lot but have only had it for a few weeks and it’s already tarnishing to the silver under the gold. I’m so sad!',
        rating: 4,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2020-08-20T15:36:34+0000',
        reviewText:
          'I was actually really disappointed with this purchase. The necklace is very cute and stylish however I’ve had it less than twelve weeks and have worn it twice and it is already tarnishing. Save your money and skip out on this purchase',
        rating: 1,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Chain Extenders For Necklace 4pc - A New Day&#8482; Silver/Gold',
    price: 4.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_48e6c010-86d0-4efc-acb5-8883adb0def2',
    category: 'jewelery',
    description:
      'The Necklace Chain Extender Set from A New Day&#153; allows for a perfectly customized fit, every time. Lend versatility and variation to your existing jewelry collection by converting your favorite short necklace into a long one. This necklace chain extender set contains two gold and two silver chain extenders in varying lengths to match each of your necklaces.',
    reviews: [
      {
        title: 'As described',
        submissionTime: '2018-04-04T16:01:49+0000',
        reviewText: 'They were exactly as described and what I was needing!',
        rating: 5,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      },
      {
        title: 'chain fades',
        submissionTime: '2017-11-14T05:06:13+0000',
        reviewText:
          "The gold chain turned silver after a week. Don't waste your money if you want the gold chain.",
        rating: 1,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name:
      'Trio Imitation Rhodium with Glass Crystal Rhinestone Hoop Earring Set 3pc - Wild Fable&#8482; White Crystal',
    price: 6,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_36ddbf23-6bf7-4009-982e-d35af2c2150c',
    category: 'jewelery',
    description:
      'Earring set includes three pairs of sparkly hoop earrings, each with the same design in varying sizes. Acrylic crystal rhinestones are embedded in each hoop, finished in silver for a shiny look.',
    reviews: [
      {
        title: 'Buy them!',
        submissionTime: '2020-12-11T18:43:15+0000',
        reviewText:
          'These are so fab! Super surprised at how much I would enjoy wearing them. Very light as well.',
        rating: 5,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: 'Smooth Hoop Earring Set 3ct - Wild Fable&#8482;',
    price: 6,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_3ba0dbdb-e1e7-43c9-bb1c-672b71ed3d01',
    category: 'jewelery',
    description:
      'Set of three pairs of medium, slim hoop earrings. Each pair features a different metallic finish — gold, rose gold and silver. Post construction with latch back hold earrings in place for comfortable and secure wear.',
    reviews: [
      {
        title: 'Happy customer',
        submissionTime: '2019-07-24T15:52:18+0000',
        reviewText: 'The earrings is great and for a great price',
        rating: 5,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2019-09-19T21:05:22+0000',
        reviewText:
          'I received the item with one pair missing. Also from the picture it looks like three different colored hoops but I got two kinda rusty gold ones. Returning this to store.',
        rating: 1,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'Connoisseurs Advanced Jewelry Cleaner Dazzle Drops',
    price: 8.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_96c70b78-d57c-45c0-9a18-14780b207482',
    category: 'jewelery',
    description:
      'This elegantly designed jewelry cleaner cleans your jewelry in fresh solution every time. No more cleaning in dirty solution. Just squeeze, dip and dazzle! Non Toxic. Includes Advanced Jewelry Cleaner (enough for over 80 (10 drops) cleanings), Easy to use dipping scoop, now holds more jewelry, easy-grip cleansing brush is specialized to clean all jewelry surfaces and the cleansing container conveniently stores brush, scoop, & drops.',
    reviews: [
      {
        title: 'Worth it',
        submissionTime: '2016-05-27T14:34:24+0000',
        reviewText:
          'This jewelry cleaner works much better than I anticipated. It is single use. All you have to do is fill the container with water followed by the addition of ten drops of solution, which come in a separate bottle, then shake it up a bit. What I like the most is that the solution is fresh every time so I am not re-dipping in dirty cleaner. Jewelry comes out dazzling! There is a brush supplied for those items that need a little extra cleaning or hard to reach areas. The solution bottle is a nice size so it can be used many times.',
        rating: 5,
        totalFeedbackCount: 52,
        totalPositiveFeedbackCount: 51,
        reviewType: 'POSITIVE'
      },
      {
        submissionTime: '2019-08-07T17:14:09+0000',
        reviewText:
          'The product did not clean my jewelry. I would not recommend.',
        rating: 1,
        totalFeedbackCount: 1,
        totalPositiveFeedbackCount: 1,
        reviewType: 'NEGATIVE'
      }
    ]
  },
  {
    name: 'St. Patrick&#39;s Day Pot of Gold Earrings',
    price: 6,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_c8416ea0-386b-4dce-aaf8-2beb27766d31',
    category: 'jewelery',
    description:
      'Searching for that pot ‘o gold? It’s been right under your nose this whole time! Treat your accessories collection to a small fortune with the St. Patrick’s Day Pot of Gold Earrings. These earrings commemorate the ‘ole leprechaun fable of a pot of gold sitting at the end of a rainbow, as faux crystals make up the rainbow and gold in a shimmery black pot with a sparkly shamrock. Wear these earrings with a green headband for a sweet and festive look, or throw them on with your leprechaun ensemble for an ultra-charming costume.',
    reviews: [
      {
        title: "Cute St. Patrick's Day earrings",
        submissionTime: '2021-02-22T17:50:45+0000',
        reviewText:
          "Very cute earrings. I bought these for my daughter for St. Patrick's day. They have great sparkle and they aren't too heavy. They don't irritate her ears.",
        rating: 5,
        totalFeedbackCount: 2,
        totalPositiveFeedbackCount: 2,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name:
      'Women&#39;s Earring Back 28 pc Brass Earring Back - A New Day&#8482; Gold/Clear/Silver',
    price: 4.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_69ce7a2e-8336-4420-b7d4-e30ea6d8da26',
    category: 'jewelery',
    description:
      "For all those times you've lost an earring back, this Earring Back Set has you covered. The set includes four styles of earring backs in multiple colors so you'll always have the right option to secure your earrings &mdash; with 28 earring backs in gold, clear and silver, you'll always have a backup.. JEWELRY DISCLAIMER",
    reviews: [
      {
        title: 'Ear Backs',
        submissionTime: '2018-02-19T17:35:12+0000',
        reviewText: 'Hard to find, and very pleased with assortment.',
        rating: 5,
        totalFeedbackCount: 4,
        totalPositiveFeedbackCount: 4,
        reviewType: 'POSITIVE'
      }
    ]
  },
  {
    name: 'Hoop with Pave Stones Earrings - A New Day&#153;',
    price: 7.99,
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_b65fd992-cc28-4b98-9d86-32b8a3fd44b2',
    category: 'jewelery',
    description:
      'Any day can feel a bit more glamorous when you put on the Pave Stone Hoop Earrings from A New Day&#153;. With a metallic finish along the outside, these pave stone earrings are accented with clear stones along the front and on the interior of the hoop, adding an extra dose of shine to everyday looks. Add these pave hoop earrings to a wrap dress and heels for a special date night or wear with a V-neck sweater and jeans for a chic finishing touch to your casual ensemble.',
    reviews: [
      {
        title: 'Pretty earrings',
        submissionTime: '2020-08-23T16:24:23+0000',
        reviewText: 'I love these earring I wear them everyday!!',
        rating: 5,
        totalFeedbackCount: 6,
        totalPositiveFeedbackCount: 6,
        reviewType: 'POSITIVE'
      },
      {
        title: 'Ridiculously Hard to Put on',
        submissionTime: '2020-10-20T15:03:56+0000',
        reviewText: 'I returned them because they were just so hard to put on.',
        rating: 1,
        totalFeedbackCount: 3,
        totalPositiveFeedbackCount: 3,
        reviewType: 'NEGATIVE'
      }
    ]
  }
]

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    const users = await Promise.all([
      User.create({email: 'cody@email.com', password: '123', isAdmin: 'TRUE'}),
      User.create({email: 'murphy@email.com', password: '123'})
    ])

    const products = await Promise.all(
      productData.map(value => {
        return Product.create(value)
      }),
      await Promise.all(
        newElectronicsData.map(async product => {
          let {name, price, imageUrl, category, description, reviews} = product
          const newReviews = await Promise.all(
            reviews.map(review => {
              let {title, reviewText, rating} = review
              return Review.create({title, reviewText, rating})
            })
          )
          const newProducts = await Product.create({
            name,
            price,
            imageUrl,
            category,
            description
          })
          await newProducts.addReviews(newReviews)
          return newProducts
        })
      ),
      await Promise.all(
        newMenClothingData.map(async product => {
          let {name, price, imageUrl, category, description, reviews} = product
          const newReviews = await Promise.all(
            reviews.map(review => {
              let {title, reviewText, rating} = review
              return Review.create({title, reviewText, rating})
            })
          )
          const newProducts = await Product.create({
            name,
            price,
            imageUrl,
            category,
            description
          })
          await newProducts.addReviews(newReviews)
          return newProducts
        })
      ),
      await Promise.all(
        newWomenClothingData.map(async product => {
          let {name, price, imageUrl, category, description, reviews} = product
          const newReviews = await Promise.all(
            reviews.map(review => {
              let {title, reviewText, rating} = review
              return Review.create({title, reviewText, rating})
            })
          )
          const newProducts = await Product.create({
            name,
            price,
            imageUrl,
            category,
            description
          })
          await newProducts.addReviews(newReviews)
          return newProducts
        })
      ),
      await Promise.all(
        newJeweleryData.map(async product => {
          let {name, price, imageUrl, category, description, reviews} = product
          const newReviews = await Promise.all(
            reviews.map(review => {
              let {title, reviewText, rating} = review
              return Review.create({title, reviewText, rating})
            })
          )
          const newProducts = await Product.create({
            name,
            price,
            imageUrl,
            category,
            description
          })
          await newProducts.addReviews(newReviews)
          return newProducts
        })
      )
    )

    // const electronicProducts = await Promise.all(
    //   newElectronicsData.map(async (product) => {
    //     let {name, price, imageUrl, category, description, reviews} = product
    //     const newReviews = await Promise.all(
    //       reviews.map((review) => {
    //         let {title, reviewText, rating} = review
    //         return Review.create({title, reviewText, rating})
    //       })
    //     )
    //     const newProducts = await Product.create({
    //       name,
    //       price,
    //       imageUrl,
    //       category,
    //       description,
    //     })
    //     await newProducts.addReviews(newReviews)
    //     return newProducts
    //   })
    // )

    // await Promise.all(
    //   newElectronicsData.map(async (product) => {
    //     const newProduct = await Product.findOne({where: {name: product.name}})
    //     const newReviews = await Promise.all(
    //       product.reviews.map((review) => {
    //         let {title, reviewText, rating} = review
    //         return Review.create({title, reviewText, rating})
    //       })
    //     )
    //     await newProduct.addReviews(newReviews)
    //   })
    // )

    // newElectronicsData(async (product) => {
    //   const newProduct = await Product.findOne({where: {name: product.name}})
    //   const newReviews = await Product.findOne({
    //     where: {reviewText: product.reviews[0].reviewText},
    //   })
    //   await newProduct.addReview(newReviews)
    // })

    // const cart2 = await Cart.create()
    // const user1 = await User.findByPk(1)
    // const user2 = await User.findByPk(2)

    // const product2 = await Product.findByPk(2)
    // const product3 = await Product.findByPk(3)
    // const product4 = await Product.findByPk(4)

    // await user1.addCart(cart1)
    // await user2.addCart(cart2)
    // await cart2.addProducts([product3, product4])

    console.log(`seeded ${users.length} users`)
    console.log(`seeded ${products.length} products`)
    console.log(`seeded successfully`)
  } catch (err) {
    console.log(err)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
