import express, {Express} from 'express';
import {PartnerData} from './types';

const app: Express = express();
const port = 4000;

// Some partner data
const partners: PartnerData = {
    "Speak For The Trees": {
        thumbnailUrl: "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
        name: "Speak For The Trees",
        description: "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
        active: true
    },
    "Partner One": {
        thumbnailUrl: "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
        name: "Partner One",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget odio vitae quam pellentesque hendrerit. Sed placerat diam ex, non porta mauris gravida eu. Praesent vitae lacus nec metus euismod finibus. In egestas tellus et nulla vehicula bibendum. Donec odio dolor, ultrices a cursus at, cursus vitae sem. Praesent porttitor lectus quis lectus rutrum, a fringilla erat sollicitudin. Ut dictum erat urna, vel sollicitudin purus commodo at. Cras commodo pellentesque gravida. In ac libero vitae nulla pretium aliquam viverra a nisl. Nunc volutpat mi sed lectus tempor aliquam. Donec faucibus, justo ut rutrum bibendum, lorem mauris lobortis ipsum, a pulvinar ligula quam eu dui. Ut quam neque, fringilla id bibendum tincidunt, mattis sed dui. Praesent lacus sem, volutpat a justo quis, facilisis luctus metus. Nam at augue ut arcu convallis egestas. Aliquam erat volutpat.\n" +
            "\n" +
            "Donec vel mi nec ante rutrum consectetur. Sed vel lectus vitae lectus gravida sodales at ac lectus. Curabitur non scelerisque ante, a ullamcorper massa. Curabitur interdum leo quis massa dignissim interdum. Nullam pharetra urna vitae purus aliquam ultricies. Sed finibus maximus sagittis. Fusce nec dui nulla. Maecenas ut elementum risus. Aenean sit amet faucibus nunc, nec dignissim nisi. Etiam porttitor ultrices sem nec semper. Quisque pulvinar risus ante, ut rutrum sapien feugiat vitae. Morbi fringilla auctor lobortis. Donec dapibus purus nec tortor dapibus, nec mollis odio mattis. Ut a tortor venenatis nibh consequat gravida a eget augue. Suspendisse sit amet purus sed lectus scelerisque interdum. Suspendisse vitae risus sed lorem vestibulum posuere.\n",
        active: false
    },
    "Partner Two": {
        thumbnailUrl: "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/LLB_2019_rgb.png",
        name: "Partner Two",
        description: "Description for Partner Two",
        active: true
    }
}

/* 
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for the frontend so it can call the backend
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next();
})

/*
  APPLICATION ROUTES
*/

app.get('/', (_req, res) => {
    res.status(200).send(partners);
})

app.delete('/delete', (req, res) => {
    const organization = req.body;
    console.log(organization);

    // If the name does not exist and/or something else goes wrong
    if (organization.hasOwnProperty('organization')) {
        console.log(organization['organization']);
        try {
            delete partners[organization['organization']];

            console.log("\n\nPartners is now:");
            console.log(partners);

            res.status(200).send(partners);

            // res.status(200).send("Deletion Successful");
            return;
        } catch (error) {
            res.status(400).send(error);
            return;
        }
    } else {
        res.status(400).send("Organization property does not exist");
        return;
    }
})

app.post('/update', (req, res) => {
    const updatePartner = req.body;

    let thumbnail = partners[updatePartner['originalName']]['thumbnailUrl'];
    let active = partners[updatePartner['originalName']]['active'];
    let description = partners[updatePartner['originalName']]['description'];
    let name = partners[updatePartner['originalName']]['name']

    console.log(thumbnail);
    console.log(active);
    console.log(description);
    console.log(name);

    console.log(updatePartner);

    try {
        if (updatePartner.hasOwnProperty('active')) {
            active = updatePartner['active'];
        }
        if (updatePartner.hasOwnProperty('name')) {
            name = updatePartner['name'];
        }
        if (updatePartner.hasOwnProperty('thumbnailUrl')) {
            thumbnail = updatePartner['thumbnailUrl'];
        }
        if (updatePartner.hasOwnProperty('description')) {
            description = updatePartner['description'];
        }

        delete partners[updatePartner['originalName']];

        console.log(thumbnail);
        console.log(active);
        console.log(description);
        console.log(name);

        partners[name] = {
            thumbnailUrl: thumbnail,
            name: name,
            active: active,
            description: description
        };

        res.status(200).send(partners);
    } catch {
        res.sendStatus(400)
    }
})

app.post('/create', (req, res) => {
    const newPartner = req.body;

    if (newPartner.hasOwnProperty('active')
        && newPartner.hasOwnProperty('name')
        && newPartner.hasOwnProperty('thumbnailUrl')
        && newPartner.hasOwnProperty('description')) {

        partners[newPartner['name']] = {
            thumbnailUrl: newPartner['thumbnailUrl'],
            name: newPartner['name'],
            active: newPartner['active'],
            description: newPartner['description']
        };

        res.status(200).send(partners);
    } else {
        res.sendStatus(400)
    }
})

// Start the backend
app.listen(port, () => {
    console.log(`Express server starting on port ${port}!`);
})