[//]: # (This is the TypeScript version of the starter code for Code4Community's technical challenge for Fall 2024. )

[//]: # (For more detailed information about each of the parts of this starter code, check out the [`INFO.md`]&#40;INFO.md&#41; file)

[//]: # ()
[//]: # (## Prerequisites)

[//]: # ()
[//]: # (If you don't have them already, you'll need to install Node.js/NPM and Git:)

[//]: # (- Node.js + NPM - install [here]&#40;https://nodejs.org/en/download/package-manager&#41; &#40;we highly recommend using at least Node 18.0.0 + NPM 8.6.0&#41;)

[//]: # (   - You can choose to install via the command line under "Package Manager", or download an installer under "Prebuilt Installer")

[//]: # (   - Node and NPM are installed together)

[//]: # (- Git - install [here]&#40;https://git-scm.com/downloads&#41;)

[//]: # ()
[//]: # (## Setup Instructions)

[//]: # ()
[//]: # (1. Clone this repo on to your computer. You can do so with the [desktop app]&#40;https://desktop.github.com/&#41;, or in a terminal with the following:)

[//]: # (```)

[//]: # (git clone https://github.com/huang0h/c4c-challenge-sample.git)

[//]: # (```)

[//]: # (2. In a terminal, run `npm install` **at the root of this project** to install the required packages)

[//]: # (3. Run `npm run dev` **at the root of this project** to start the app locally)

[//]: # (4. Visit `http://localhost:3000` to view the website)

[//]: # (    )
[//]: # (    4a. The backend will be available at `http://localhost:4000`)

[//]: # ()
[//]: # (npm install @mui/material @emotion/react @emotion/styled)

# C4C Challenge
## Installation and Starting 
Starting this project should be like any other React project. Simply use npm 
install to install the required dependencies (only MUI). If this doesn't 
work, use `(npm install @mui/material @emotion/react @emotion/styled)` Then to 
run, use `npm run dev`.
## High-Level Overview
Starts in `App.tsx` then moves to `Dashboard.tsx`. Within `Dashboard.tsx`, 
the API calls to retrieve data are sent, and then we move to our two main 
components `Searchbar.tsx` and `PartnerTile.tsx`. To achieve a left and 
right alignment of the partner profiles, a simple mapping is used with an 
index variable, thought it was nice. All the rendering and logic for the 
partner profiles are done in `PartnerTile.tsx`.

## Design Decisions
This project uses Material UI. I just wanted to try out a new component 
library. Not much overall. I simply worked from the dashboards and created
things as I went. More details in [Reflection](#given-more-time)

Importantly, when profiles are being updated or added, I send those changes
over to the back-end. The back-end verifies it, and then sends the new
complete list of partner profiles back. I made this decision as I was not 
entirely sure how to get the front-end to re-render when the back-end has 
new data. So, I just passed the `setData` prop down for whatever element 
needs to update, delete, or add a partner.
## Reflection
### What I Learned
I definitely learned a lot through this project. In the past, I have only 
done ReactJS projects with the front-end, and maybe Supabase connected to it,
but I had never written my own API calls. This was definitely a great 
experience in learning about ExpressJS and the front-end/back-end dynamic (I 
suck at making things look pretty, so back-end was great).
### Given More Time
There is definitely some messy code involved here. Given more time, I would 
definitely split my elements into their own components and add more comments 
describing. Additionally, now that I understand more about the interactions 
between the front-end and back-end I feel that sitting down before starting 
and planning the general layout of the project would have been beneficial. 
This includes having design decisions that are more uniform (such as for a 
request having an organization's name passed in the url portion (`:name`) or 
passed within the JSON).
### Bonus Feature
The search bar and directly editing an organization's name. I implemented 
the search bar because that was a thing I have done in other projects before.

I implemented editing an organization's attributes because I didn't realize it 
was option... whoops. I had a pretty poor implementation of editing an 
organization's attributes, namely it's just deleting and then creating. But 
there were a few mistakes along the way (several), such as useState not 
immediately updating and learning about how React batches updates. But the 
end result was cool.