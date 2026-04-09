<script>
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
    import { generate, grabRandomProject, grabDescription } from "$lib/index.js"
    import {highScore} from "$lib/highScore.svelte.js";

    let project = $state({});
    let other = $state({});
    let text = $state(0);
    let gameState = $state("vote");
    let animation = $state("asd");
    let dropshit = $state(0);

    let wasd = highScore();

    // const stored = localStorage.highScore
    // const highScore = writable(stored || 0);
    // highScore.subscribe((value) => localStorage.highScore = value)


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
    
    async function reshit() {
        gameState = "vote";
        animation = null;
        text = 0;     
        let data = await grabRandomProject();
        let shit = data[Math.floor(Math.random() * data.length)];
        let meow = await generate(data, shit);

        // console.log(meow);
        project = meow.one;
        project.description = await grabDescription(project.id);
        other = meow.two;
    }

    onMount(async () => {
        await reshit();
        // project = await grabRandomProject();
    });


    function runanimation(a) {
        let amount = null;
        const time = (stamp) => {
            if (!amount) amount = stamp;
            const progress = Math.min((stamp - amount) / 2500, 1);
            dropshit = Math.floor(progress * (a - 0) + 0)
            if (progress < 1) {
                window.requestAnimationFrame(time);
            }

        }
        requestAnimationFrame(time);
    }


    async function compare(think) {
        if (think == "higher" && other.total_hours > project.total_hours || think == "lower" && other.total_hours < project.total_hours) {
            animation = "running";
            runanimation(other.total_hours);
            setTimeout(async () => {
                text += 1;
                await shit();
                animation = null;
                // gameState = "lose";
            }, 3500);
        } else {
            
            animation = "running";
            runanimation(other.total_hours);
            
            setTimeout(() => {
                gameState = "lose";
                if (text > wasd.value) wasd.value = text;
            }, 3500);
        }
    }

</script>

<div class="relative flex flex-col h-screen">
    {#if gameState == "vote"}
        <div class="flex">
            <p class="px-4 py-2 whitespace-nowrap">Flavordle</p>
            <p class="px-4 py-2 whitespace-nowrap">Points: {text}</p>
            <p class="px-4 py-2 whitespace-nowrap">High Score: {wasd.value}</p>
        </div>
        <div class="flex flex-col md:flex-row flex-1">
            <div style="background-image: url({project.banner_url}); background-position: center; background-size: cover;" class="px-4 py-2 flex w-full md:w-1/2 md:h-full h-1/2 items-center justify-center flex-col">
                <div class="flex flex-col items-center justify-center bg-white w-full rounded-md px-2 py-1 gap-2">
                    <h1 class="text-3xl">{project.title}</h1>
                    <p>{project.total_hours} hours</p>
                    <p class="line-clamp-4">{project.description}</p>
                </div>

            </div>

            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <span class="text-2xl font-bold bg-white rounded-full w-12 h-12 flex items-center justify-center">OR</span>
            </div>

            <div style="background-image: url({other.banner_url}); background-position: center; background-size: cover;" class="px-4 py-2 flex w-full md:w-1/2 h-1/2 md:h-full items-center justify-center flex-col gap-1">
                <div class="flex flex-col items-center justify-center bg-white w-full rounded-md px-2 py-1 gap-2">
                    <h1 class="text-3xl">{other.title} has</h1>
                    {#if animation == "running"}
                        <h1 class="text-3xl">{dropshit}</h1>
                        <!-- <button class="px-4 py-2 bg-lime-400" onclick={() => runanimation(25)}>test</button> -->
                    {:else}
                        <button onclick={async () => await compare("higher")} class="px-4 py-2 bg-lime-400 text-white rounded hover:bg-lime-500 transition">Higher</button>
                        <button onclick={async () => await compare("lower")} class="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition">Lower</button>
                    {/if}
                    <p>hours</p>
                    <p class="line-clamp-4">{other.description}</p>
                </div>
            </div>
        </div>
    {:else if gameState == "lose"}
      <div class="flex flex-col md:flex-row flex-1">
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center flex-col gap-3 px-5 py-3 bg-gray-300 rounded-md">
            <h1 class="text-5xl">Game over!</h1>
            <p class="text-2em">You have sadly lost Flavordle. Try restarting and see if you can get a higher score >:)</p>
            <p>Your score was</p>
            <h1 class="text-3xl">{text}</h1>
            <p>points!</p>
            <button class="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition" onclick={async () => await reshit()}>Restart</button>
        </div>
      </div>
    {/if}
</div>

<!-- <h1>{project.title}</h1>
<p>{project.total_hours}</p>
<h1>{other.title}</h1>
<p>{other.total_hours}</p> -->
