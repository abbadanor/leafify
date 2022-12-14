<script setup>
import { ref, onMounted } from "vue";
import axios from "axios"

const cameraActive = ref(true)
const video = ref(null);
const canvas = ref(null)
const dataURL = ref(null)
const uploadStatus = ref(null)
const prediction = ref(null)

const leaves = {
    "Ulmus carpinifolia": {
        name: "Lundalm",
        description: "Bladen är 6–10 centimeter långa och i stort sett ovala i formen.\nArten förekommer nästan i hela Väst-, Central- och Östeuropa med undantag av Alpernas höga regioner och regioner norr om centrala Litauen. På de brittiska öarna hittas den endast i sydöstra England. Lundalm har inga fasta bestånd på det skandinaviska fastlandet men den växer på Öland och på Gotland. Utbredningsområdet fortsätter över flera Medelhavsöar till norra Algeriet och angränsande områden. I öst når den fram till Turkiet vid Svarta havet och över Kaukasus till norra Iran. Avskilda populationer hittas i centrala Mellanöstern (till exempel Israel).\n",
        img: "https://upload.wikimedia.org/wikipedia/commons/4/43/Blismes_elm_2007.jpg"
    },
    "Acer": {
        name: "Lönn",
        description: "subsp. turkestanicum (Pax) P.C.de Jong \nLönn, även skogslönn, (Acer platanoides) är ett träd i familjen kinesträdsväxter. Dess vetenskapliga namn platanoides syftar på att dess handflikiga blad liknar platanernas blad, ett trädsläkte som ofta planteras som prydnadsträd i mellersta och södra Europa. Arten är reproducerande i Sverige.\n",
        img: "https://static.byggahus.se/attachments/images/large/424/424473-ce534226f41ab577598539d756409abc.jpg"
    },
    "Salix aurita": {
        name: "Bindvide",
        description: "Den är en liten eller medelstor buske av maximalt 6 meters höjd, vars blad har ojämn vågkant. Undersidan av bladen har höga nerver på gråluden botten. Den har ganska stora småblad. Arten växer längs hela den norska kusten upp till Bodø. Den föredrar fuktig torv- eller sandjord, stränder, fuktängar, och myrar. \nBindvide är en buske på normalt 1-2 meters höjd men kan nå upp till 5-6 meter. Kvistarna har vedåsar under barken. Årsskotten är glest (sällan tätt) korthåriga och är rödbruna. Bladskaften är bara 2-6 mm långa, och bladen är 3-6 cm, upp till två gånger så långa som breda. Kanten av bladet är ojämn och vågformad, ofta nedböjd och buktande. Översidan är grön med nedsänkta bladnerver, undersidan tätt gråluden med upphöjda nerver. Mellan undersidans grennerver syns många parallella smånerver i 90° mot dem. Stiplerna är ganska stora och tydliga, njurformade och tandade. De sitter kvar året igenom. Bindvide blommar i maj-juni, med början strax före lövsprickningen. \n",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Salix_aurita_02-05-2006_19.34.46.JPG/1200px-Salix_aurita_02-05-2006_19.34.46.JPG"
    },
    "Quercus": {
        name: "Ek",
        description: "Eksläktet kännetecknas av fröet, ollonet, som är nötartat utan vita, men med en läderartad fruktvägg, med basen nedsänkt i en fruktskål (cupula), vilken bildats ur det urholkade blomfästet och täckts med små fjäll.\nEkollon sprids främst av djur, särskilt nötskrikan är känd för att transportera ekollon flera hundra meter och gömma ekollonet i marken för att sedan, ofta tidig vår, återvända och konsumera det. Inte alla ekollon återfinns, och de som gömts i ljusöppna miljöer gror ofta och bildar  nya plantor, ty eken växer bra i öppna miljöer. Även smågnagare och ekorre (\"hoppar som en orre i en ek\") kan sprida (men främst äta!) ekollon. De allra flesta ollon som gror skjuter upp nära eken, men dör i regel, ty konkurrensen från annan vegetation är hård. Dessutom är små ekar svårt utsatta för växtätare, alltifrån insekter, smågnagare, och särskilt klövvilt.\n",
        img: "https://www.skogskunskap.se/Large/cd_20171116101742/contentassets/d7af7508edb044ef92df01422bc27535/img_7606-ekollon_mats_hannerz_1200x675px.jpg"
    },
    "Alnus incana": {
        name: "Gråal",
        description: "Gråalen invandrade från Finland omkring 3000 f.Kr., ungefär samtidigt som granen kom från samma håll. Den spred sig mot fjällkedjan till skogsgränsen och i fjällskogsbältet har den fortfarande sin västligaste utbredning. I norra Svealand mötte gråalen sin släkting, klibbalen, och gråalen har idag sin sydliga utbredning ungefär till norrlandsgränsen.\nGråalen är idag Gästriklands landskapsträd.\n",
        img: "https://www.vdberk.se/media/7870/alnus_incana-1.jpg"
    },
    "Betula pubescens": {
        name: "Björk",
        description: "Björksläktet innehåller några av de – i bland annat Sverige – allra vanligaste lövträden. De kännetecknas framför allt (detta gäller dock inte samtliga arter inom släktet) av sina vita stammar med svarta fläckar. Björken är ett pionjärträd, vilket betyder att det kommer som det första av sly när bar mark uppstått efter avverkning, stormfällning, skogsbrand och liknande.\nBjörksläktets arter är extremt köldtåliga, beroende på den under vintern höga halten av björksocker, vilket fungerar som ett frysskydd.\n",
        img: "https://www.vdberk.se/media/12590/betula-pubescens.jpg"
    },
    "Salix alba var. Sericea": {
        name: "Silverpil",
        description: "Varianter på vitpilen är vanlig vitpil (Salix alba var. alba) och silverpil (Salix alba var. sericea Gaudin).\nVarianten Salix alba caerulea odlas i Storbritannien för produktion av slagträn för kricket. Dess trä är starkt och lätt och har hög motståndskraft mot att spricka upp. \n",
        img: "https://www.hasselforsgarden.se/wp-content/uploads/sites/4/2020/09/Silverpil-trad.jpg"
    },
    "Populus tremula": {
        name: "Asp",
        description: "I Nordamerika finns en närbesläktad art, amerikansk asp (P. tremuloides), som skiljer sig bland annat på glesare tandning på löven. En korsning (hybrid) mellan P. tremula och P. tremuloides är det som kallas för hybridasp och denna anses växa snabbare, vara lättare att föryngra[förtydliga] och härdigare mot vissa sjukdomar än den inhemska aspen.\nTremula kommer av latin tremulare = darra, med syftning på de lättrörliga bladen. I Småland kallas aspen espe, på Öland esp.\n",
        img: "https://visaskogen.se/wp-content/uploads/2018/06/asp.jpg"
    },
    "Ulmus glabra": {
        name: "Alm",
        description: "Skogsalm, i dagligt tal alm (Ulmus glabra Huds.), är ett träd i familjen almväxter. I Sverige förekommer två underarter vanlig skogsalm, Ulmus glabra ssp. glabra, med tunnare bark, rakare grenar och bredare blad och bergalm, Ulmus glabra ssp. montana mera lågvuxen med tjockare bark, något hängande grenar och smalare, nästan enkelsågade, blad.\nSkogsalm är ett 30 – 40 meter högt träd, med elliptiska, äggrunda till omvänt äggrunda och mycket sträva, på båda sidor borst- och glandelhåriga, blad, med mer eller mindre avsatt spets, dubbel- till flersågad kant, överlappande bladbasflikar och 12 till 18 par sidonerver.\n",
        img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Sapporo_Autumn_Gold%2C_Florence.jpg"
    },
    "Sorbus aucuparia": {
        name: "Rönn",
        description: "Rönnen blir aldrig särskilt stor och är, som Linné skrivit, \"ett träd, som icke blir gammalt\". Den växer snabbt men blir sällan mer än 50-60 år.\nOrdet rönn kommer förmodligen från röd (bli röd, rodna-rönna), och kan då syfta på bären eller på lövens klara höstfärger.\n",
        img: "https://www.garmundo.se/media/catalog/product/cache/ef4f9e0a2113c8f6b0dca5163ff3c479/s/o/sorbus-aucuparia-fruits-22.jpg"
    },
    "Salix sinerea": {
        name: "Gråvide",
        description: "Gråvide förekommer i Sverige och Finland ungefär till polcirkeln och upp i de lägre fjälltrakterna. På grund av hybridisering med sälg och andra videarter finns många former med varierande utseende. \n",
        img: "https://pollenrapporten.se/images/18.448e6fa1785aded72a3326b/1618581156714/RIMG2560.JPG"
    },
    "Populus": {
        name: "Poppel",
        description: "Balsampoppel är den poppel som först infördes till Sverige i början av 1700-talet. De flesta av de andra arterna kom in under samma århundrade. Med några undantag förökar sig poppeln inte i vilt tillstånd utan måste odlas genom sådd, ympning eller genom sticklingar.\nPoppel är idag Värmlands landskapsträd.\n",
        img: "https://kottenlottis.files.wordpress.com/2011/08/poppel.jpg"
    },
    "Tilia": {
        name: "Lind",
        description: "Lind (Tilia cordata Mill., även kallad skogslind) är ett ädellövträd inom släktet lindar och familjen malvaväxter.\nNär ädellövträden invandrade i södra Skandinavien 7 000–6 700 f.Kr. hade linden, med sina begränsade krav på växtförhållanden, inga svårigheter att konkurrera med den befintliga trädfloran, huvudsakligen asp, björk och tall. Under den varmare period som inträffade 6 000–3 000 f.Kr. kunde linden sprida sig upp till södra Norrland och blev i de sydligare delarna av landet ett dominerande trädslag. Under det kallare skede som sedan följde drog sig linden tillbaka men kan i dag åter påträffas upp till Norrlandsgränsen.\n",
        img: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Tilia_tomentosa12.JPEG"
    },
    "Sorbus intermedia": {
        name: "Oxel",
        description: "Oxel uppkom i Sverige efter det att artfränder kommit in från kontinenten efter istiden. Arten bildades sannolikt genom korsbefruktning mellan antingen vitoxel och tyskoxel eller vitoxel och rönn. Av detta skäl växer oxeln vilt endast i Norden.\nOxel är idag Hallands landskapsträd.\n",
        img: "https://www.wexthuset.com/images/products/gtg-nordic/alletrad-oxel-hogstam.jpg"
    },
    "Fagus Silvatica": {
        name: "Bok",
        description: "Bok (Fagus sylvatica) är ett träd som tillhör familjen bokväxter och som första gången beskrevs taxonomiskt av den svenske botanikern Carl von Linné 1753. Boken är ett stort träd med mycket tät krona, slät oveckad stam och glänsande gröna blad.\nLöven, som är ätbara, växer platt horisontellt för att samla maximalt med ljus, vilket får till följd att solen sällan når under trädets grenar och växtligheten under träden präglas av detta, samtidigt som boklöven förmultnar långsamt.\n",
        img: "https://cdn.azotelibrary.com/image/w1300/hdb_a0526.webp"
    }
}

async function openCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment",
                height: window.innerWidth,
                width: window.innerHeight,
            },
            audio: false,
        });
        video.value.srcObject = stream;
        canvas.value.width = window.innerWidth
        canvas.value.height = window.innerHeight
    } catch (error) {
        console.error(error);
    }
}

function takePicture() {
    const context = canvas.value.getContext('2d');
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    dataURL.value = canvas.value.toDataURL('image/png')
    cameraActive.value = false
}

function fileUpload() {
    const d = new Date();
    let time = d.getTime();
    let data = new FormData();
    canvas.value.toBlob(function (blob) {
        data.append('file', blob, time.toString() + '.png');
        uploadStatus.value = 'loading'

        axios
            .post('/api', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                auth: {
                    username: 'api1',
                    password: 'caress9head&insure',
                },
            })
            .then(res => {
                console.log(res)
                prediction.value = res.data
                uploadStatus.value = 'done'
            })
            .error(err => {
                console.error(err)
                uploadStatus.value = 'error'
            });
    });
}


async function testAPI() {
    try {
        const res = await axios.get('/api', {
                auth: {
                    username: 'api1',
                    password: 'caress9head&insure',
                },
        })
        console.log(res.data.response)
    } catch (err) {
        console.error(err)
    }
}

onMounted(async () => {
    await openCamera();
})

</script>

<template>
    <div v-if="!uploadStatus" class="absolute bottom-0">
        <video autoplay ref="video"></video>
        <canvas class="hidden" ref="canvas"></canvas>
    </div>
    <div v-if="cameraActive" class="w-full h-48 absolute bottom-0 flex justify-center items-center">
        <div @click="takePicture" class="bg-white h-16 w-16 rounded-full active:bg-gray-200"></div>
    </div>
    <div v-if="!cameraActive && !uploadStatus"
        class="absolute bottom-0 bg-white w-full h-5/6 flex flex-col rounded-t-3xl px-2 py-2 items-center">
        <i-mdi-close @click="cameraActive = true"
            class="bg-slate-200 rounded-full text-gray-600 h-12 w-12 shrink-0 self-end p-2">
        </i-mdi-close>
        <h1 class="font-semibold text-2xl mb-3">Är du nöjd med bilden?</h1>
        <img :src="dataURL" class="h-3/4 rounded-lg shrink block" />
        <i-material-symbols-check-circle-rounded class="h-20 w-20 text-green-600 rounded-full active:text-green-600"
            @click="fileUpload">
        </i-material-symbols-check-circle-rounded>
    </div>
    <div v-if="uploadStatus" class="min-h-screen w-full flex justify-center bg-white p-4">
        <i-mdi-loading v-if="uploadStatus === 'loading'" class="self-center animate-spin h-16 w-16 text-green-600">
        </i-mdi-loading>
        <div v-if="uploadStatus === 'done'" class="flex flex-col items-center">
            <h1 class="font-semibold text-3xl">{{ leaves[prediction.species].name }}</h1>
            <p class="text-green-600 text-xl font-semibold">{{ prediction.confidence.toFixed(1) }}%</p>
            <p class="text-gray-700">{{ prediction.species }}</p>
            <img class="rounded-lg" alt="" :src="leaves[prediction.species].img" />
            <p class="text-gray-700">{{ leaves[prediction.species].description }}</p>
            <br />

            <p @click="uploadStatus = null; cameraActive = true; openCamera()" class="text-green-600 underline">Gör om
            </p>
        </div>
    </div>
</template>
