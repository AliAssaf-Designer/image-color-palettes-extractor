// Variables
const getFile = document.querySelector("#getFile");
const input_btn = document.querySelector(".input-btn");
const image = document.querySelector(".image");
const added_img = document.getElementById("added-image");
const reload_image = document.querySelector(".reload-image");
const color = document.querySelectorAll(".color");
const imageColorSubmit = document.querySelector(".image-submit");
const readyColorSubmit = document.querySelector(".ready-submit");
const color_type = document.querySelector(".color-type");
const ready_color_type = document.querySelector(".ready-color-type");
const color_num = document.querySelector(".color-num");
const ready_color_num = document.querySelector(".ready-color-num");
const color_templates = document.querySelector(".color-templates");
const palettes = document.querySelector(".palettes");
const color_more_info = document.querySelector(".color-more-info");
const download_templates = document.querySelector(".download-templates");
const download_palettes = document.querySelector(".download-palettes");

const colorAPI = "https://www.thecolorapi.com/";

// Values Variables
let currentColor = [], currentType = "analogous", currentCount = 4, imageColors = [];

// hide input file after display img
getFile.addEventListener("input", ()=>{
    input_btn.style.display = "none";
    image.style.display = "flex";
});
// reload new image
reload_image.addEventListener("click", ()=>{
    input_btn.style.display = "flex";
    image.style.display = "none";
});
// display the image and extract color from image
getFile.addEventListener("change", (e)=>{
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
            const image = new Image();
            added_img.src = reader.result;
            image.src = reader.result;
            image.onload = () => {
                imageColorSubmit.addEventListener("click", ()=>{
                    extractColorsFromImage(image);
                });
            }
        }
    }
});
// lists options
color_type.addEventListener("change", (e)=>{
    color_num.style.display = "block";
    const value = e.target.value;
    currentType = value;
    triadicAndTetradicColorCount();
});
color_num.addEventListener("change", (e)=>{
    imageColorSubmit.style.display = "block";
    const value = e.target.value;
    currentCount = value;
});
// EXTRACT IMAGE COLORS PALETTES
// image color extract
function extractColorsFromImage(image){
    colorjs.prominent(image, {amount: currentCount, format: "hex"}).then((color)=>{
        color_templates.style.display = "block";
        imageColors = [];
        imageColors.push(...color);
        color_templates.innerHTML = "";
        color_more_info.innerHTML = "";
        for (let i = 0; i < imageColors.length; i++) {
            currentColor = imageColors[i];
            const color_template = document.createElement("div");
            const template_title = document.createElement("h3");
            const colors_cards = document.createElement("div");

            color_template.classList.add("color-template");
            template_title.classList.add("color-template_title");
            colors_cards.classList.add("colors-cards");
            colors_cards.setAttribute("value", i);

            const templateTitle = template_Title(i);
            template_title.innerHTML = `التنسيق ${templateTitle}:`;
            generateImagePaletteHtml(currentType, colors_cards);

            color_template.appendChild(template_title);
            color_template.appendChild(colors_cards);
            color_templates.appendChild(color_template);

        }
        select_templates(color_templates, imageColors, download_templates, "colors-cards", "color-card");
    });
};
// generated colors functions
function generateAnalogousColors(hsl, count){
    const colors = [];
    const [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        colors.push([(hue + 30 *i) % 360, saturation, lightness]);
    }
    return colors;
}
function generateMonochromaticColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        colors.push([hue, saturation, (lightness = 10 * i) % 100]);
    }
    return colors;
}
function generateTriadicColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        colors.push([(hue + 120 * i) % 360, saturation, lightness]);
    }
    return colors;
}
function generateComplementaryColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        colors.push([(hue + 150 * i) % 360, saturation, lightness]);
    }
    return colors;
}
function generateShadesColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        colors.push([hue, (saturation + 10 * i) % 100, lightness]);
    }
    return colors;
}
function generateTetradicColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        let colorValue = [(hue + 90 * i) % 360, saturation, lightness];
        colors.push(colorValue);
    }
    return colors;
}
function generateSquareColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        colors.push([(hue + 60 * i)%360, saturation, lightness]);
    }
    return colors;
}
function generateRandomColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        colors.push([Math.random()*360, Math.random()*100, Math.random()*100]);
    }
    return colors;
}
function generateHotColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        let newHue = (hue + 45 * i) % 360;
        if (newHue < 90 || newHue > 270) {
            colors.push([newHue % 360, saturation, lightness]);
        }
        else if(newHue > 90 && newHue <= 180){
            newHue = newHue - 90;
            colors.push([newHue % 360, saturation, lightness]);
        }
        else{
            newHue = newHue + 90;
            colors.push([newHue % 360, saturation, lightness]);
        }
    }
    return colors;
}
function generateColdColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        let newHue = hue + 45 * i;
        if (newHue > 90 || newHue < 270) {
            colors.push([newHue % 360, saturation, lightness]);
        }
        else if(newHue < 90 && newHue >= 0){
            newHue = newHue + 90;
            colors.push([newHue % 360, saturation, lightness]);
        }
        else if(newHue > 270 && newHue < 360){
            newHue = newHue - 90;
            colors.push([newHue % 360, saturation, lightness]);
        }
    }
    return colors;
}
// choose the palette type
function generateImagePalette(hsl,type,count){
    switch (type) {
        case "analogous": 
            return generateAnalogousColors(hsl,count);
        case "monochromatic": 
            return generateMonochromaticColors(hsl,count);
        case "triadic": 
            return generateTriadicColors(hsl,count);
        case "complementary": 
            return generateComplementaryColors(hsl,count);
        case "shades": 
            return generateShadesColors(hsl,count);
        case "tetradic": 
            return generateTetradicColors(hsl,count);
        case "square": 
            return generateSquareColors(hsl,count);
        case "random": 
            return generateRandomColors(hsl,count);
        case "hot": 
            return generateHotColors(hsl,count);
        case "cold": 
            return generateColdColors(hsl,count);
    }
}
// generate the palette colors
function generateImagePaletteHtml(type, container){
    let color = currentColor;
    let count = currentCount;
    const hsl = getHslFromColor(color);
    if(!hsl) return;
    let palette = [];
    container.innerHTML = "";
    palette = generateImagePalette(hsl, type, count);
    palette?.forEach((color)=>{
        const colorEl = document.createElement("div");
        colorEl.classList.add("color-card");
        colorEl.style.backgroundColor = HslToHex(color);
        colorEl.style.width = `calc(100%/${currentCount})`;
        if (screen.width < 768) {
            colorEl.style.width = `calc(100%/${currentCount / 2})`;
        }
        if (currentCount >= 8) {
            colorEl.style.fontSize = "13.5px";
        }
        const colorInfo = colorAPI+`id?format=hsl&hsl=${color}`;
        fetch(colorInfo)
        .then(response => response.json())
        .then(colorName =>{
            colorEl.innerHTML = 
            `
            <h5 class="color-card_name">${colorName.name.value}</h5>
            <h5 class="color-card_hex">${HslToHex(color)}</h5>
            <h5 class="color-card_rgb">${colorName.rgb.value}</h5>
            <h5 class="color-card_cmyk">${colorName.cmyk.value}</h5>
            <h5 class="color-card_hsl">hsl(${Math.round(color[0])},${Math.round(color[1])}%,${Math.round(color[2])}%)</h5>
            <a class="color-card_more">معلومات كاملة></a>
            `;
            colorEl.addEventListener("click",(e)=>{
                if (!e.target.classList.contains("color-card_more")) {
                    copyColorNameType(e);
                }
                else {
                    addColorFullInfo(colorName);
                }
            });
        });
        container.appendChild(colorEl);
    });
}
// functions for colors values
function getHslFromColor(color){
    let hsl;
    if (isValidColor(color)) {
        let temp = document.createElement("div");
        temp.style.color = color;
        document.body.appendChild(temp);
        let styles = window.getComputedStyle(temp, null);
        let rgb = styles.getPropertyValue("color");
        document.body.removeChild(temp);
        rgb = removeRGB(rgb);
        hsl = rgbToHsl(rgb);
    }
    return hsl;
}
function isValidColor(color){
    return CSS.supports("color", color);
}
function removeRGB(rgb){
    return rgb.replace("rgb(", "").replace(")", "").split(",");
}
function rgbToHsl(rgb){
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;

    let cMin = Math.min(r, g, b);
    let cMax = Math.max(r, g, b);
    let delta = cMax - cMin;
    let h = 0;
    let s = 0;
    let l = (cMin + cMax) / 2;

    if (delta === 0) {
        h = 0;
        s = 0;
    }else if (cMax === r) {
        h = ((g - b) / delta);
    }else if (cMax === g) {
        h = (b-r) / delta + 2;
    }else{
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }
    if (delta !== 0) {
        s = Math.round((delta / (1- Math.abs(2 * l - 1))) * 100);
    }
    l = Math.round(l * 100);
    return [h,s,l];
}
function HslToHex(hsl){
    let h = hsl[0];
    let s = hsl[1];
    let l = hsl[2];
    l /= 100;
    const a =(s * Math.min(l, 1-l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
// add template title
function template_Title(index){
    switch (index) {
        case 0:
            return "الأول";
        case 1:
            return "الثاني";
        case 2:
            return "الثالث";
        case 3:
            return "الرابع";
        case 4:
            return "الخامس";
        case 5:
            return "السادس";
        case 6:
            return "السابع";
        case 7:
            return "الثامن";
        case 8:
            return "التاسع";
        case 9:
            return "العاشر";
    }
}
// make count of color for triadic three and for tetradic four
function triadicAndTetradicColorCount(){
    switch (color_type.value) {
        case "triadic":
            color_num.style.display = "none";
            imageColorSubmit.style.display = "block";
            currentCount = 3;
            break;
        case "tetradic":
            color_num.style.display = "none";
            imageColorSubmit.style.display = "block";
            currentCount = 4;
            break;
        default:
            color_num.style.display = "block";
            currentCount = color_num.value;
            break;
    }
}
// full info for each color
function addColorFullInfo(color){
    color_more_info.innerHTML = "";
    color_more_info.innerHTML += 
    `
        <div class="color-mode">
            <h4 class="mode-title">XYZ Color Mode:</h4>
            <p class="mode-value">The value for this color is: ${color.XYZ.value}</p>
            <div class="mode-each-value">
                <p class="each-value">X = ${color.XYZ.X}</p>
                <p class="each-value">Y = ${color.XYZ.Y}</p>
                <p class="each-value">Z = ${color.XYZ.Z}</p>
            </div>
            <p class="fraction">Fraction for it: X = ${color.XYZ.fraction.X}, Y = ${color.XYZ.fraction.Y}, Z = ${color.XYZ.fraction.Z}</p>
        </div>
        <div class="color-mode">
            <h4 class="mode-title">CMYK Color Mode:</h4>
            <p class="mode-value">The value for this color is: ${color.cmyk.value}</p>
            <div class="mode-each-value">
                <p class="each-value">C = ${color.cmyk.c}</p>
                <p class="each-value">M = ${color.cmyk.m}</p>
                <p class="each-value">Y = ${color.cmyk.y}</p>
                <p class="each-value">K = ${color.cmyk.k}</p>
            </div>
            <p class="fraction">Fraction for it: C = ${color.cmyk.fraction.c}, M = ${color.cmyk.fraction.m}, Y = ${color.cmyk.fraction.y}, K = ${color.cmyk.fraction.k}</p>
        </div>
        <div class="contrast">
            <h4 class="mode-title">Contrast:</h4>
            <p class="mode-value">The value for it's contrast is: ${color.contrast.value}</p>
        </div>
        <div class="color-mode">
            <h4 class="mode-title">HEX Color Mode:</h4>
            <p class="mode-value">The value for this color is: ${color.hex.value}</p>
            <p class="mode-value">The clean value of hex code is: ${color.hex.clean}</p>
        </div>
        <div class="color-mode">
            <h4 class="mode-title">HSL Color Mode:</h4>
            <p class="mode-value">The value for this color is: ${color.hsl.value}</p>
            <div class="mode-each-value">
                <p class="each-value">H = ${color.hsl.h}</p>
                <p class="each-value">S = ${color.hsl.s}</p>
                <p class="each-value">L = ${color.hsl.l}</p>
            </div>
            <p class="fraction">Fraction for it: H = ${color.hsl.fraction.h}, S = ${color.hsl.fraction.s}, L = ${color.hsl.fraction.l}</p>
        </div>
        <div class="color-mode">
            <h4 class="mode-title">HSV Color Mode:</h4>
            <p class="mode-value">The value for this color is: ${color.hsv.value}</p>
            <div class="mode-each-value">
                <p class="each-value">H = ${color.hsv.h}</p>
                <p class="each-value">S = ${color.hsv.s}</p>
                <p class="each-value">V = ${color.hsv.v}</p>
            </div>
            <p class="fraction">Fraction for it: H = ${color.hsv.fraction.h}, S = ${color.hsv.fraction.s}, V = ${color.hsv.fraction.v}</p>
        </div>
        <div class="color-mode">
            <h4 class="mode-title">RGB Color Mode:</h4>
            <p class="mode-value">The value for this color is: ${color.rgb.value}</p>
            <div class="mode-each-value">
                <p class="each-value">r = ${color.rgb.r}</p>
                <p class="each-value">g = ${color.rgb.g}</p>
                <p class="each-value">b = ${color.rgb.b}</p>
            </div>
            <p class="fraction">Fraction for it: R = ${color.rgb.fraction.r}, G = ${color.rgb.fraction.g}, B = ${color.rgb.fraction.b}</p>
        </div>
        <div class="color-mode">
            <h4 class="mode-title">Named Color Mode:</h4>
            <p class="mode-value">The name of this color is: ${color.name.value}</p>
            <div class="mode-each-value">
                <p class="each-value">If this color is named: ${color.name.exact_match_name}</p>
                <p class="each-value">And the closest named to it in hex mode is: ${color.name.closest_named_hex}</p>
            </div>
            <p class="fraction">Distance to closest named color is: ${color.name.distance}</p>
        </div>
        <div class="color-mode">
            <h4 class="mode-title">Color Image:</h4>
            <div class="color-image">
                <div>
                    <h5 class="image-title">Named Image:</h5>
                    <img src="${color.image.named}" alt="named image" class="each-image"/>
                </div>
                <div>
                    <h5 class="image-title">Bare Image:</h5>
                    <img src="${color.image.bare}" alt="bare image" class="each-image"/>
                </div>
            </div>
        </div>
    `;
}
// Copy Color Info
function copyColorNameType(e){
    const color = e.target.innerHTML;
    navigator.clipboard.writeText(color);
    toast(e);
}
function toast(e){
    const copied = document.createElement("i");
    copied.classList.add("ri-check-double-line");
    copied.style.color = "green";
    copied.style.fontSize = "20px";
    e.target.appendChild(copied);
    setTimeout(() =>{
        copied.style.display = "inline";
    }, 100);
    setTimeout(() =>{
        e.target.removeChild(copied);
        copied.addEventListener("transitionend", ()=>{
            copied.remove();
        })
    }, 1000);
}
// DOWNLOAD PALETTES
// select template for downloading it
function select_templates(template, array, container, class_name, card_class_name){
    let colors_template = template.querySelectorAll(`.${class_name}`);
    container.innerHTML = "";
    const select_templates = document.createElement("div");
    const select_title = document.createElement("h5");
    const select_template = document.createElement("select");
    const select_option = document.createElement("option");

    select_templates.classList.add("select-templates");
    select_title.classList.add("select-title");
    select_title.innerHTML = "اختر التنسيق الذي تريده:";
    select_template.classList.add("select-template");
    select_template.classList.add("color-info");
    select_option.value = "";
    select_option.innerHTML = "اختر التنسيق";
    select_template.appendChild(select_option);

    for (let i = 0; i < array.length; i++) {
        const select_option = document.createElement("option");
        select_option.value = i;
        select_option.innerHTML = template_Title(i);
        select_template.appendChild(select_option);
    }

    select_templates.appendChild(select_title);
    select_templates.appendChild(select_template);
    container.appendChild(select_templates);

    select_template.addEventListener("change", ()=>{
        if (container.children.length === 1) {
            downloadTemplate(select_template, colors_template, container, card_class_name);
        }
        else{
            container.removeChild(container.lastChild);
            downloadTemplate(select_template, colors_template, container, card_class_name);
        }
    });
}
// download types
function downloadTemplate(select, palette, container, card_class_name){
    let options = ["png", "svg", "css", "json"];
    const download_template = document.createElement("div");
    const download_format = document.createElement("div");
    const select_download_format = document.createElement("select");
    const select_download_option = document.createElement("option");
    const download = document.createElement("div");
    const or_separator = document.createElement("div");
    const code_format = document.createElement("div");
    const select_code_format = document.createElement("select");
    const code_option = document.createElement("option");
    const code = document.createElement("div");

    download_template.classList.add("download-template");
    download_format.classList.add("download-format");
    select_download_format.classList.add("select-download-format");
    select_download_format.classList.add("color-info");
    select_download_option.classList.add("format");
    download.classList.add("download_button");
    or_separator.classList.add("or-separator");
    code_format.classList.add("code-format");
    select_code_format.classList.add("select-code-format");
    select_code_format.classList.add("color-info");
    code_option.classList.add("format");
    code.classList.add("code");

    select_download_option.innerHTML = "اختر صيغة التنزيل";
    select_download_option.value = "";

    select_download_format.appendChild(select_download_option);
    for (let i = 0; i < options.length; i++) {
        const select_download_option = document.createElement("option");
        select_download_option.classList.add("format");
        select_download_option.value = options[i];
        select_download_option.innerHTML = options[i].toUpperCase();
        select_download_format.appendChild(select_download_option);
    }
    select_download_format.addEventListener("change", ()=>{
        download.innerHTML = "";
        const download_btn = document.createElement("input");
        
        download_btn.type = "button";
        download_btn.classList.add("image-submit");
        download_btn.classList.add("download-btn");
        download_btn.value = "تنزيل";
        
        download_btn.addEventListener("click", () =>{
            const format = select_download_format.value;
            let templateNumber = select.value;
            templateNumber = templateNumber == ""? "palette": templateNumber;
            download_palette(format, templateNumber, palette[templateNumber], card_class_name);
        })
        
        download.appendChild(download_btn);
    });

    or_separator.innerHTML = `
        <div class="top-line"></div>
        <p class="or">OR</p>
        <div class="bottom-line"></div>
    `;

    code_option.value = "";
    code_option.innerHTML = "اختر نمط الكود";
    select_code_format.appendChild(code_option);
    for (let i = 2; i < options.length; i++) {
        const code_option = document.createElement("option");
        code_option.classList.add("format");
        code_option.value = options[i];
        code_option.innerHTML = options[i].toUpperCase();
        select_code_format.appendChild(code_option);
    }
    select_code_format.addEventListener("change", ()=>{
        code.innerHTML = "";
        const code_title = document.createElement("div");
        const title = document.createElement("h4");
        const file_copy = document.createElement("i");
        const real_code = document.createElement("div");

        code_title.classList.add("code-title");
        file_copy.classList.add("ri-file-copy-line");
        real_code.classList.add("real-code");

        title.innerHTML = "انسخ الكود التالي:";

        const format = select_code_format.value;
        let templateNumber = select.value;
        templateNumber = templateNumber == ""? "palette": templateNumber;
        show_palette(format, real_code, palette[templateNumber], card_class_name);

        file_copy.addEventListener("click", ()=>{
            navigator.clipboard.writeText(real_code.innerHTML);
            file_copy.classList.remove("ri-file-copy-line");
            file_copy.classList.add("ri-check-double-line");

            setTimeout(() => {
                file_copy.classList.remove("ri-check-double-line");
                file_copy.classList.add("ri-file-copy-line");
            }, 1000);
        });

        code_title.appendChild(title);
        code_title.appendChild(file_copy);
        code.appendChild(code_title);
        code.appendChild(real_code);
        code_format.appendChild(code);
    });

    download_format.appendChild(select_download_format);
    download_format.appendChild(download);
    code_format.appendChild(select_code_format);
    download_template.appendChild(download_format);
    download_template.appendChild(or_separator);
    download_template.appendChild(code_format);
    container.appendChild(download_template);
}
// Choose the download format
function download_palette(format, number, palette, card_class_name){
    const paletteColors = palette.querySelectorAll(`.${card_class_name}`);
    const colors = [];
    paletteColors.forEach((color) =>{
        colors.push(color.style.backgroundColor);
    });
    switch (format) {
        case "png":
            download_palette_png(colors, number);
            break;
        case "svg":
            download_palette_svg(colors, number);
            break;
        case "css":
            download_palette_css(colors, number);
            break;
        case "json":
            download_palette_json(colors, number);
            break;
        case "pdf":
            download_palette_pdf(colors, number, palette);
            break;
    }
}
// download formats
function download_palette_png(colors, name){
    const canvas = document.createElement("canvas");
    canvas.width = colors.length * 200;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    colors.forEach((color, index) =>{
        ctx.fillStyle = color;
        ctx.fillRect(index * 200, 0, 200, 1000);
    });
    const link = document.createElement("a");
    link.download = template_Title(parseInt(name)) + ".png";
    link.href = canvas.toDataURL();
    link.click();
}
function download_palette_svg(colors, name){
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewbox", "0 0 1200 600");
    svg.setAttribute("preserveAspectRatio", "none");
    colors.forEach((color, index) =>{
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        const width = 1200 / colors.length;
        rect.setAttribute("x", index * width);
        rect.setAttribute("y", 0);
        rect.setAttribute("width", width);
        rect.setAttribute("height", 600);
        rect.setAttribute("fill", color);
        svg.appendChild(rect);
    });
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.download = template_Title(parseInt(name)) + ".svg";
    downloadLink.href = svgUrl;
    downloadLink.click();
}
function download_palette_css(colors, name) {
    const css = `:root{
        ${colors.map((color, index) => `--color-${index + 1}: ${color};`).join("\n")}
    }`;
    const blob = new Blob([css], {type: "text/css"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = template_Title(parseInt(name)) + ".css";
    link.href = url;
    link.click();
}
function download_palette_json(colors, name) {
    const json = JSON.stringify(colors);
    const blob = new Blob([json], {type: "application/json",});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = template_Title(parseInt(name)) + ".json";
    link.href = url;
    link.click();
}
// Choose the code format
function show_palette(format, target, palette, card_class_name){
    const paletteColors = palette.querySelectorAll(`.${card_class_name}`);
    const colors = [];
    paletteColors.forEach((color) =>{
        colors.push(color.style.backgroundColor);
    });
    switch (format) {
        case "css":
            show_palette_css(colors, target);
            break;
        case "json":
            show_palette_json(colors, target);
            break;
    }
}
// code formats
function show_palette_css(colors, target){
    const css = `:root{
        ${colors.map((color, index) => `--color-${index + 1}: ${color};`).join("\n")}
    }`;
    target.innerHTML = css;
}
function show_palette_json(colors, target){
    const json = JSON.stringify(colors);
    target.innerHTML = json;
}
// READY PALETTES
//  ready lists options
ready_color_type.addEventListener("change", (e)=>{
    ready_color_num.style.display = "block";
    const value = e.target.value;
    currentType = value;
    readyTriadicAndTetradicColorCount();
});
ready_color_num.addEventListener("change", (e)=>{
    readyColorSubmit.style.display = "block";
    const value = e.target.value;
    currentCount = value;
});
readyColorSubmit.addEventListener("click", (color)=>{
    generateReadyPalettesHtml(color);
    select_templates(palettes, generateRandomRgbColors(currentCount), download_palettes, "palette", "color");
});
// generate ready colors templates
function generateReadyPaletteHtml(type, container){
    let color = currentColor;
    let count = currentCount;
    const hsl = getHslFromColor(color);
    if(!hsl) return;
    let palette = [];
    container.innerHTML = "";
    palette = generateImagePalette(hsl, type, count);
    palette?.forEach((color)=>{
        const palette_color = document.createElement("div");
        palette_color.classList.add("palette_color");
        const colorInfo = colorAPI+`id?format=hsl&hsl=${rgbToHsl(color)}`;
        fetch(colorInfo)
        .then(response => response.json())
        .then(colorName =>{
            palette_color.innerHTML = 
            `
            <div class="color" style="background-color: rgb(${color});"></div>
            <div class="color-names">
                <h4>${HslToHex(color)}</h4>
            </div>
            `;
            palette_color.addEventListener("mouseenter", ()=>{
                palette_color.style.height = "62vh";
                palette_color.children[0].style.height = "70%";
                palette_color.children[0].innerHTML = `<h4 class="colorName">${colorName.name.value}</h4>`;
                if (palette_color.children[1].children.length === 1) {
                    palette_color.children[1].innerHTML += 
                    `
                    <h4>${colorName.rgb.value}</h4>
                    <h4>${colorName.cmyk.value}</h4>
                    <h4>${colorName.hsl.value}</h4>
                    `;
                }
            });
            palette_color.addEventListener("mouseleave", ()=>{
                setTimeout(()=>{
                    palette_color.style.height = "30vh";
                    palette_color.children[0].style.height = "85%";
                    palette_color.children[0].innerHTML = "";
                    if (palette_color.children[1].children.length === 4) {
                        palette_color.children[1].innerHTML = `<h4>${HslToHex(color)}</h4>`;
                    }
                });
            });
        });
        palette_color.addEventListener("click",(e)=>{
            copyColorNameType(e);
        });
        container.appendChild(palette_color);
    });
}
// generate ready colors
function generateRandomRgbColors(count){
    count = currentCount;
    let colors = [];
    for (let i = 0; i < count; i++) {
        var r = Math.round(Math.random()*255);
        var g = Math.round(Math.random()*255);
        var b = Math.round(Math.random()*255);
        colors.push(`rgb(${r},${g},${b})`);
    }
    return colors;
}
// make count of color for triadic three and for tetradic four
function readyTriadicAndTetradicColorCount(){
    switch (ready_color_type.value) {
        case "triadic":
            ready_color_num.style.display = "none";
            readyColorSubmit.style.display = "block";
            currentCount = 3;
            break;
        case "tetradic":
            ready_color_num.style.display = "none";
            readyColorSubmit.style.display = "block";
            currentCount = 4;
            break;
        default:
            ready_color_num.style.display = "block";
            currentCount = ready_color_num.value;
            break;
    }
}
// generate whole ready templates
function generateReadyPalettesHtml(color){
    color = generateRandomRgbColors(currentCount);
    palettes.style.display = "block";
    palettes.innerHTML = "";
    for (let i = 0; i < color.length; i++) {
        currentColor = color[i];
        const palette = document.createElement("div");
        const palette_title = document.createElement("div");
        const palette_colors = document.createElement("div");

        palette.classList.add("palette");
        palette_title.classList.add("palette-title");
        palette_colors.classList.add("palette-colors");

        palette_title.innerHTML = `<h3>التنسيق ${template_Title(i)}:</h3>`
        generateReadyPaletteHtml(currentType, palette_colors);

        palette.appendChild(palette_title);
        palette.appendChild(palette_colors);
        palettes.appendChild(palette);
    }
}
// call it when the site loaded
window.onload= generateReadyPalettesHtml();
window.onload = select_templates(palettes, generateRandomRgbColors(currentCount), download_palettes, "palette", "color");
// Menu for mobiles
function burger_menu() {
    var nav = document.querySelector(".nav");
    var nav_list = document.querySelector("#nav-list");
    if (nav.style.height === "19vh") {
        nav.style.height = "50vh";
        nav_list.style.display = "block";
    } else {
        nav.style.height = "19vh";
        nav_list.style.display = "none";
    }
}