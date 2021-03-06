class Virykle {
    constructor (selector, elementsCount, id) {  //gaunam info
        this.selector = selector;           
        this.elementsCount = elementsCount;     // kaitlentes pavirsiai / kaitvietes  ...su siais dviem issisaugau info
        this.id = id;

        this.DOM = null;
        this.rangesDOM = null;                  // pirma susirandam virykle, o tada joje ieskom kaitlenciu, jungikliu
        this.allElementsDOM = null;             // []
        this.allSwitchesDOM = null;             // []  //null rasom, nes mes net nebandem ieskot, kai bandom kazko ieskot, tada []
        this.price = 1000; 
        this.proportion = {
            x: 1,
            y: 1
        } 

        this.init();                        //pradedam kazka inicijuoti
    }

    init() {
        if (!this.isValidSelector() ||
            !this.findElementBySelector() ||
            !this.isValidElementsCount() ||
            !this.isValidID()) {                   //pasitikrinam ar validus visi
            return false;
        }

        this.calcProportions();
        this.render();                      //logikos isskaidymas i kita dali 
        this.addEvents();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' || 
                    this.selector === '') {
            return false;                           //patikrinam ar ne tuscias tekstas
        }
        return true;                          
    }

    findElementBySelector() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

// Pirmas variantas:
        // if (!this.DOM) {                 !null -> true;
        //     return false;          
        // }
        // return true;

// Pilnai uzrasom if-else:
        // if (!this.DOM) {
        //     return  false;
        // } else {
        //     return true;
        // }                                

// Is neigiamo klausimo padarom teigiama klausima:
        // if (this.DOM) {
        //     return  true;
        // } else {
        //     return false;
        // }                                    

// Galim perdaryti i ternari:
        // return this.DOM ? true : false;      

// Konvertuojame is "Node object / null" i "true/false" tipa:
        // return !!this.DOM;


    isValidElementsCount() {                                    // visame sitame klausiame, kada yra blogai
        if (typeof this.elementsCount !== 'number' ||
                    !isFinite(this.elementsCount) ||
                    this.elementsCount <= 0 ||
                    this.elementsCount % 1 !== 0) {             // turime gauti liekana 0
            return false;
        }
        return true;
    }

    isValidID() {
        if (typeof this.id !== 'string' ||
            this.id === '') {
            return false;
        }
        return true;
    }
    

    calcProportions() {
        this.proportion.x = Math.ceil(Math.sqrt(this.elementsCount))
        this.proportion.y = Math.ceil(this.elementsCount / this.proportion.x)
    }

    generateElements() {
        let HTML = '';

        for (let i=0; i < this.elementsCount; i++) {
            HTML += '<div class="kaitlente"></div>';
        }

        return HTML;
    }

    generateSwitches() {
        let HTML = '';

        for (let i=0; i < this.elementsCount; i++) {
            HTML += '<div class="jungiklis"></div>';
        }

        return HTML;
    }

    render() {
        const elementWidth = 120;
        const elementMargin = 10;
        const fullElementWidth = elementWidth + elementMargin * 2;
        const rangesBorderWidth = 1;
        const width = fullElementWidth * this.proportion.x + rangesBorderWidth * 2;

        // sukonstruojamas HTML
        const HTML = `<div id="${this.id}" class="virykle" style="width: ${width}px;">
                        <div class="kaitlentes">
                            ${this.generateElements()}
                        </div>
                        <div class="jungikliai">
                            ${this.generateSwitches()}
                        </div>
                    </div> `;

        // istatome i NARSYKLE
        this.DOM.insertAdjacentHTML('beforeend', HTML);

        // susirandame tai, ka katik sukureme
        this.rangesDOM = this.DOM.querySelector('#' + this.id);
        this.allElementsDOM = this.rangesDOM.querySelectorAll('.kaitlente');         //savyje (this.DOM) - toje virykleje bandau susirasti kaitlente
        this.allSwitchesDOM = this.rangesDOM.querySelectorAll('.jungiklis');         //savyje (this.DOM) - toje virykleje bandau susirasti jungikli

       }

       addEvents() {
           for (let i = 0; i < this.allSwitchesDOM.length; i++) {
               const elementDOM = this.allElementsDOM[i];
               const switchDOM = this.allSwitchesDOM[i];

               switchDOM.addEventListener('click', () => {                  //priima parametrus: koks ivykis ir ka daryti
                   switchDOM.classList.toggle('ijungtas');
                   elementDOM.classList.toggle('ijungtas');
               })                                            
           }
       }
}

export { Virykle }


/*

SKYLES ISDESTYMAS:
1       1X1
2       2X1
3       2x2
4       2x2
5       3x2
6       3x2
7       3x3
8       3x3
9       3x3
10      4x3
11      4x3
12      4x3
13      4x4
14      4x4
15      4x4
16      4x4

Pirmasis skaicius:

n - skyliu kiekis
ceil - apvalinam i virsu

x = Math.ceil(Math.sqrt(n))         gausime, kiek reikia i ploti sudeti skyliu
y = Math.ceil(n / x)

n = 7
x = 3                                saknis is 7 yra 2.645
y = 3                               7 / 3 = 2.33333

n = 10
x = 4                                saknis is 10 yra 3.16
y = 3                               10 / 4 yra 2.5

*/