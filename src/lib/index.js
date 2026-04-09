// place files you want to import through the `$lib` alias in this folder.exp
let data = null;
export async function grabRandomProject() {
    if (data === null) {
        let fetcher = await fetch("res.json");
        let random = await fetcher.json();
        data = random;
    }

    return data;
}


export async function grabDescription(id) {
    let fetcher = await fetch(`https://ftpdb.jam06452.uk/api/project_info/${id}`);
    let random = await fetcher.json();
    return random[0].description;
}

export async function generate(data, prev) {
    // let rand = data[Math.floor(Math.random() * data.length)];
    let filter = data.filter((item) => item.total_hours != prev.total_hours);
    let res;
    if (filter.length == 0) res = {"total_hours":-1,"title":"debug","id":2};
    res = filter[Math.floor(Math.random() * filter.length)];

    res.description = await grabDescription(res.id);

    return {
        one: prev,
        two: res,
    }
}

