<script>
    let project = $state({"id":"1","title":"test","total_hours":0});
    async function grabRandomProject() {
        let random = await fetch("https://ftpdb.jam06452.uk/api/random_projects?filter=stat_hot_score")
        let json = await random.json();
        let rand = json[Math.floor(Math.random() * json.length)];
        project = rand;
    }
    grabRandomProject();
</script>


<h1>{project.title}</h1>
<p>{project.total_hours}</p>

