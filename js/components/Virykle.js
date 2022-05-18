class Virykle {
    constructor (selector, elementsCount) {  //gaunam info
        this.selector = selector;           
        this.selector = elementsCount;     // kaitlentes pavirsiai / kaitvietes  ...su siais dviem issisaugau info

        this.DOM = null;
        this.price = 1000;                  

        this.init();                        //pradedam kazka inicijuoti
    }

    init() {
        if (!this.isValidSelector() ||
            !this.findElementBySelector() ||
            !this.isValidElementsCount()) {         //pasitikrinam ar validus visi
            return false;
        }

        this.render();                      //logikos isskaidymas i kita dali 
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

    render() {
        let HTML = `<div class="virykle">
                        <div class="kaitlentes">
                            <div class="kaitlente"></div>
                            <div class="kaitlente"></div>
                            <div class="kaitlente"></div>
                            <div class="kaitlente"></div>
                        </div>
                        <div class="jungikliai">
                            <div class="jungiklis"></div>
                            <div class="jungiklis"></div>
                            <div class="jungiklis"></div>
                            <div class="jungiklis"></div>
                        </div>
                    </div> `;

        this.DOM.insertAdjacentHTML('beforeend', HTML);
    }
}

export { Virykle }