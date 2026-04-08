// place files you want to import through the `$lib` alias in this folder.exp
export async function grabRandomProject() {
    let fetcher = await fetch("https://ftpdb.jam06452.uk/api/random_projects?filter=stat_hot_score");
    let random = await fetcher.json();
    // let rand = random[Math.floor(Math.random() * random.length)];
    return random;
}

export async function generate(data, prev) {
    // let rand = data[Math.floor(Math.random() * data.length)];
    let filter = data.filter((item) => item.total_hours != prev.total_hours);
    let res;
    if (filter.length == 0) res = {"total_hours":-1,"title":"debug","id":2};
    res = filter[Math.floor(Math.random() * filter.length)];

    return {
        one: prev,
        two: res,
    }
}