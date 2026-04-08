<script>
    import { onMount } from "svelte";
    import { generate, grabRandomProject } from "$lib/index.js"

    let project = $state({});
    let other = $state({});
    let text = $state(0);
    /*
    let project = $state({"id":"1","title":"test","total_hours":0});
    let other = $state({"id":"1","title":"test","total_hours":0});
    */

    async function shit() {        
        let data = await grabRandomProject();
        // let shit = data[Math.floor(Math.random() * data.length)];
        let meow = await generate(data, other);
        project = other;
        other = meow.two;
    }

    onMount(async () => {
        let data = await grabRandomProject();
        let shit = data[Math.floor(Math.random() * data.length)];
        let meow = await generate(data, shit);
        console.log(meow);
        project = meow.one;
        other = meow.two;
        // project = await grabRandomProject();
    });

    async function compare(think) {
        if (think == "higher" && other.total_hours > project.total_hours) {
            text += 1;
            await shit();
        } else if (think == "lower" && other.total_hours < project.total_hours) {
            text += 1;
            await shit();
        } else {
            text = 0;
        }
        // if (think == "higher") {
        //     if (project.total_hours > other.total_hours) {
                
        //     } 
        // } else {
            
        // }
    }

</script>

<div>
    <div>
        <h1>{project.title} </h1>
        <p>{project.total_hours} hours</p>
    </div>
    <div>
        <h1>{other.title} has</h1>
    </div>
    <button onclick={async () => await compare("higher")} class="px-4 py-2 bg-lime-400 text-white rounded hover:bg-lime-500 transition">Higher</button>
    <button onclick={async () => await compare("lower")} class="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition">Lower</button>
    <p>Score: {text}</p>
</div>

<!-- <h1>{project.title}</h1>
<p>{project.total_hours}</p>
<h1>{other.title}</h1>
<p>{other.total_hours}</p> -->
