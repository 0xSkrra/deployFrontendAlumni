interface group {
    title:string,
    description:string,
    banner:string, //if any
};

interface event {
    name:string,
    description:string,
    lastUpdated: Date,
    startTime:Date,
    endTime:Date,
    allowGuests:boolean
    banner:string,
    usersAccepted:user,
    //om event skal tilhøre både group og topic:
    group:group,
    topic:topic,
    //eller om eventet kun skal tilhøre én:
    parent:group|topic
    //uten å vite hvordan dere bakendere har tenkt det, antar jeg 
};

interface topic {
    name:string,
    description:string,
    posts:post,
};

interface post {
    title:string,
    body:string,
    author:string,
    parent:post,
    target:topic|group|event, //trenger kun inkludere typen event dersom users skal kunne skrive posts/kommentarer i et event
};

interface user {
    name:string,
    picture:string,
    status:string,
    bio:string,
    funFact:string,
    subscribedTopics:topic[],
    subscribedGroups:group[],
    //posts:post[], // om user detail skal vise post history trengs denne, men ikke ellers såvidt jeg vet
};