let doc = document;
// constant
const getFile = doc.querySelector("#getFile");
const input_btn = doc.querySelector(".input-btn");
const image = doc.querySelector(".image");
const added_img = doc.getElementById("added-image");
const reload_image = doc.querySelector(".reload-image");
const color = doc.querySelectorAll(".color");
const imageColorSubmit = doc.querySelector(".image-submit");
const readyColorSubmit = doc.querySelector(".ready-submit");
const color_type = doc.querySelector(".color-type");
const ready_color_type = doc.querySelector(".ready-color-type");
const palettes_num = doc.querySelector(".palettes-num");
const ready_palettes_num = doc.querySelector(".ready-palettes-num");
const color_num = doc.querySelector(".color-num");
const ready_color_num = doc.querySelector(".ready-color-num");
const color_templates = doc.querySelector(".color-templates");
const palettes = doc.querySelector(".palettes");
const color_more_info = doc.querySelector(".color-more-info");
const download_templates = doc.querySelector(".download-templates");
const download_palettes = doc.querySelector(".download-palettes");
const search_input = doc.querySelector(".search__input")
const picture_button = doc.querySelector(".picture__button");
const color_img = doc.querySelector(".color-img");

const search_button = doc.querySelector(".search__button");
const search_color_template = doc.querySelector(".search-color-template");
const search_color_palette = doc.querySelector(".search-color-palette");
const search_color_info = doc.querySelector(".search-color-info");
const search_type = doc.querySelector(".search-type");
const search_palettes_num = doc.querySelector(".search-palettes-num");
const search_color_num = doc.querySelector(".search-color-num");
const search_submit = doc.querySelector(".search-submit");
const search_more_info = doc.querySelector(".search-more-info");
const download_color_palette =doc.querySelector(".download-color-palette");

// Values Variables
const colorAPI = "https://www.thecolorapi.com/";
let currentColor = [], currentType = "analogous", currentCount = 4, currentColorCount = 4, imageColors = [];

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
        let file_extension = file.type;
        if (file_extension.includes("image")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(){
                const image = new Image();
                added_img.src = reader.result;
                image.src = reader.result;
                image.onload = () => {
                    listsOptions(color_type, palettes_num, color_num, imageColorSubmit, "color-template_title", color_templates);
                    imageColorSubmit.addEventListener("click", ()=> extractColorsFromImage(image));
                }
            }
            color_type.style.display = "block";
        }
        else error_file_type_alert("الملف الذي قمت باختياره لا يمثل صورة, قم بإعادة تحميل ملف أخر؟");
    }
});
function error_file_type_alert(txt) {
    const alert_msg_container = doc.createElement("div");
    alert_msg_container.classList.add("error-type-file");
    alert_msg_container.innerHTML = txt;
    image.appendChild(alert_msg_container);
    setTimeout(() => {image.removeChild(alert_msg_container);}, 2000);
    color_type.style.display = "none";
}
// EXTRACT IMAGE COLORS PALETTES
// image color extract
function extractColorsFromImage(image){
    colorjs.prominent(image, {amount: currentCount, format: "hex"}).then((color)=>{
        color_templates.style.display = "block";
        imageColors = [];
        imageColors.push(...color);
        color_templates.innerHTML = "";
        color_more_info.innerHTML = "";
        for (let i = 0; i < currentCount; i++) {
            currentColor = imageColors[i];
            const color_template = doc.createElement("div");
            const template_title = doc.createElement("h3");
            const colors_cards = doc.createElement("div");
            color_template.classList.add("color-template");
            template_title.classList.add("color-template_title");
            colors_cards.classList.add("colors-cards");
            colors_cards.setAttribute("value", i);
            template_title.innerHTML = `التنسيق ${i + 1}:`;
            generateImagePaletteHtml(currentType, colors_cards, color_more_info);
            color_template.appendChild(template_title);
            color_template.appendChild(colors_cards);
            color_templates.appendChild(color_template);
        }
        checkInputs(color_templates, color_type, palettes_num, color_num);
        select_templates(color_templates, imageColors, download_templates, "colors-cards", "color-card");
    });
};
// generated colors functions
function generateAnalogousColors(hsl, count){
    const colors = [];
    const [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) colors.push([(hue + 30 *i) % 360, saturation, lightness]);
    return colors;
}
function generateMonochromaticColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) colors.push([hue, saturation, (lightness = 10 * i) % 100]);
    return colors;
}
function generateTriadicColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) colors.push([(hue + 120 * i) % 360, saturation, lightness]);
    return colors;
}
function generateComplementaryColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) colors.push([(hue + 150 * i) % 360, saturation, lightness]);
    return colors;
}
function generateShadesColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) colors.push([hue, (saturation + 10 * i) % 100, lightness]);
    return colors;
}
function generateTetradicColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) colors.push([(hue + 90 * i) % 360, saturation, lightness]);
    return colors;
}
function generateSquareColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) colors.push([(hue + 60 * i)%360, saturation, lightness]);
    return colors;
}
function generateRandomColors(count){
    let colors = [];
    for (let i = 0; i < count; i++) colors.push([Math.round(Math.random()*360), Math.round(Math.random()*100), Math.round(Math.random()*100)]);
    return colors;
}
function generateHotColors(hsl, count){
    let colors = [];
    let [hue, saturation, lightness] = hsl;
    for (let i = 0; i < count; i++) {
        let newHue = (hue + 45 * i) % 360;
        if (newHue < 90 || newHue > 270) colors.push([newHue % 360, saturation, lightness]);
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
        if (newHue > 90 || newHue < 270) colors.push([newHue % 360, saturation, lightness]);
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
        case "analogous": return generateAnalogousColors(hsl,count);
        case "monochromatic": return generateMonochromaticColors(hsl,count);
        case "triadic": return generateTriadicColors(hsl,count);
        case "complementary": return generateComplementaryColors(hsl,count);
        case "shades": return generateShadesColors(hsl,count);
        case "tetradic": return generateTetradicColors(hsl,count);
        case "square": return generateSquareColors(hsl,count);
        case "random": return generateRandomColors(count);
        case "hot": return generateHotColors(hsl,count);
        case "cold": return generateColdColors(hsl,count);
    }
}
// generate the palette colors
function generateImagePaletteHtml(type, container, target){
    let color = currentColor;
    let count = currentColorCount;
    const hsl = getHslFromColor(color);
    if(!hsl) return;
    let palette = [];
    container.innerHTML = "";
    palette = generateImagePalette(hsl, type, count);
    palette?.forEach((color)=>{
        const colorEl = doc.createElement("div");
        colorEl.classList.add("color-card");
        colorEl.style.backgroundColor = HslToHex(color);
        colorEl.style.width = `calc(100%/${currentColorCount})`;
        if (screen.width < 768) {
            if (currentColorCount > 4) colorEl.style.fontSize = "11px";
            if (currentColorCount > 6) colorEl.style.width = "90px";
        }
        if (currentColorCount >= 8) colorEl.style.fontSize = "13.5px";
        const colorInfo = colorAPI+`id?format=hsl&hsl=${color}`;
        fetch(colorInfo)
        .then(response => response.json())
        .then(colorName =>{
            colorEl.innerHTML = `<h5 class="color-card_name">${colorName.name.value}</h5>
                                    <h5 class="color-card_hex">${HslToHex(color)}</h5>
                                    <h5 class="color-card_rgb">${colorName.rgb.value}</h5>
                                    <h5 class="color-card_cmyk">${colorName.cmyk.value}</h5>
                                    <h5 class="color-card_hsl">hsl(${Math.round(color[0])},${Math.round(color[1])}%,${Math.round(color[2])}%)</h5>
                                    <a class="color-card_more">معلومات كاملة></a>`;
            colorEl.addEventListener("click",(e)=>{
                if (!e.target.classList.contains("color-card_more")) copyColorNameType(e);
                else addColorFullInfo(colorName, target);
            });
        });
        container.appendChild(colorEl);
    });
}
// functions for colors values
function getHslFromColor(color){
    let hsl;
    if (isValidColor(color)) {
        let temp = doc.createElement("div");
        temp.style.color = color;
        doc.body.appendChild(temp);
        let styles = window.getComputedStyle(temp, null);
        let rgb = styles.getPropertyValue("color");
        doc.body.removeChild(temp);
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
    }else if (cMax === r) h = ((g - b) / delta);
    else if (cMax === g) h = (b-r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    if (delta !== 0) s = Math.round((delta / (1- Math.abs(2 * l - 1))) * 100);
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
// make count of color for triadic three and for tetradic four
function triadicAndTetradicColorCount(type, palettesNum, colorNum, colorSubmit){
    switch (type.value) {
        case "triadic":
            colorNum.style.display = "none";
            palettesNum.style.display = "block";
            palettesNum.addEventListener("input", ()=>{
                colorNum.style.display = "none";
                colorSubmit.style.display = "block";
            });
            currentColorCount = colorNum.value = 3;
            break;
        case "tetradic":
            colorNum.style.display = "none";
            palettesNum.style.display = "block";
            palettesNum.addEventListener("input", ()=>{
                colorNum.style.display = "none";
                colorSubmit.style.display = "block";
            });
            currentColorCount = colorNum.value = 4;
            break;
        default:
            palettesNum.style.display = "block";
            palettesNum.addEventListener("input", ()=>colorNum.style.display = "block");
            currentColorCount = colorNum.value;
            break;
    }
}
// full info for each color
function addColorFullInfo(color, target){
    target.innerHTML = "";
    target.innerHTML += `<div class="color-mode">
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
        </div>`;
}
// Copy Color Info
function copyColorNameType(e){
    const color = e.target.innerHTML;
    navigator.clipboard.writeText(color);
    toast(e);
}
function toast(e){
    const copied = doc.createElement("img");
    copied.classList.add("ri-check-double-line");
    copied.src = "./img/check-double-line.svg"
    copied.style.width = "25px";
    copied.style.height = "20px";
    e.target.appendChild(copied);
    setTimeout(() =>{copied.style.display = "inline";}, 100);
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
    const select_templates = doc.createElement("div");
    const select_title = doc.createElement("h5");
    const select_template = doc.createElement("select");
    const select_option = doc.createElement("option");
    select_templates.classList.add("select-templates");
    select_title.classList.add("select-title");
    select_title.innerHTML = "اختر التنسيق الذي تريده:";
    select_template.classList.add("select-template");
    select_template.classList.add("color-info");
    select_option.value = "";
    select_option.innerHTML = "اختر التنسيق";
    select_template.appendChild(select_option);
    for (let i = 0; i < array.length; i++) {
        const select_option = doc.createElement("option");
        select_option.value = i;
        select_option.innerHTML = i + 1;
        select_template.appendChild(select_option);
    }
    select_templates.appendChild(select_title);
    select_templates.appendChild(select_template);
    container.appendChild(select_templates);
    select_template.addEventListener("change", ()=>{
        if (container.children.length === 1) downloadTemplate(select_template, colors_template, container, card_class_name);
        else{
            container.removeChild(container.lastChild);
            downloadTemplate(select_template, colors_template, container, card_class_name);
        }
        if (select_template.value === "") container.removeChild(container.lastChild);
    });
}
// download types
function downloadTemplate(select, palette, container, card_class_name){
    let options = ["png", "svg", "css", "json"];
    const download_template = doc.createElement("div");
    const download_format = doc.createElement("div");
    const select_download_format = doc.createElement("select");
    const select_download_option = doc.createElement("option");
    const download = doc.createElement("div");
    const or_separator = doc.createElement("div");
    const code_format = doc.createElement("div");
    const select_code_format = doc.createElement("select");
    const code_option = doc.createElement("option");
    const code = doc.createElement("div");
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
        const select_download_option = doc.createElement("option");
        select_download_option.classList.add("format");
        select_download_option.value = options[i];
        select_download_option.innerHTML = options[i].toUpperCase();
        select_download_format.appendChild(select_download_option);
    }
    select_download_format.addEventListener("change", ()=>{
        download.innerHTML = "";
        const download_btn = doc.createElement("input");
        download_btn.type = "button";
        download_btn.classList.add("image-submit");
        download_btn.classList.add("download-btn");
        download_btn.value = "تنزيل";
        download_btn.addEventListener("click", () =>{
            const format = select_download_format.value;
            let templateNumber = select.value;
            templateNumber = templateNumber == ""? "palette": templateNumber;
            download_palette(format, templateNumber, palette[templateNumber], card_class_name);
        });
        download.appendChild(download_btn);
        if (select_download_format.value === "") download.removeChild(download_btn);
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
        const code_option = doc.createElement("option");
        code_option.classList.add("format");
        code_option.value = options[i];
        code_option.innerHTML = options[i].toUpperCase();
        select_code_format.appendChild(code_option);
    }
    select_code_format.addEventListener("change", ()=>{
        code.innerHTML = "";
        const code_title = doc.createElement("div");
        const title = doc.createElement("h4");
        const file_copy = doc.createElement("img");
        const real_code = doc.createElement("div");
        code_title.classList.add("code-title");
        file_copy.src = "./img/file-copy-line.svg";
        file_copy.classList.add("ri-file-copy-line");
        real_code.classList.add("real-code");
        title.innerHTML = "انسخ الكود التالي:";
        const format = select_code_format.value;
        let templateNumber = select.value;
        templateNumber = templateNumber == ""? "palette": templateNumber;
        show_palette(format, real_code, palette[templateNumber], card_class_name);
        file_copy.addEventListener("click", ()=>{
            navigator.clipboard.writeText(real_code.innerHTML);
            file_copy.src = "./img/check-double-line.svg";
            setTimeout(() => { file_copy.src = "./img/file-copy-line.svg";}, 1000);
        });
        code_title.appendChild(title);
        code_title.appendChild(file_copy);
        code.appendChild(code_title);
        code.appendChild(real_code);
        code_format.appendChild(code);
        if (select_code_format.value === "") code_format.removeChild(code);
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
    let paletteColors = palette.querySelectorAll(`.${card_class_name}`);
    const colors = [];
    paletteColors.forEach((color) => colors.push(color.style.backgroundColor));
    switch (format) {
        case "png": download_palette_png(colors, number); break;
        case "svg": download_palette_svg(colors, number); break;
        case "css": download_palette_css(colors, number); break;
        case "json": download_palette_json(colors, number); break;
    }
}
// download formats
function download_palette_png(colors, name){
    const canvas = doc.createElement("canvas");
    canvas.width = colors.length * 200;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    colors.forEach((color, index) =>{
        ctx.fillStyle = color;
        ctx.fillRect(index * 200, 0, 200, 1000);
    });
    const link = doc.createElement("a");
    link.download = parseInt(name) + 1 + ".png";
    link.href = canvas.toDataURL();
    link.click();
}
function download_palette_svg(colors, name){
    const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewbox", "0 0 1200 600");
    svg.setAttribute("preserveAspectRatio", "none");
    colors.forEach((color, index) =>{
        const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
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
    const downloadLink = doc.createElement("a");
    downloadLink.download = parseInt(name) + 1 + ".svg";
    downloadLink.href = svgUrl;
    downloadLink.click();
}
function download_palette_css(colors, name) {
    const css = `:root{
        ${colors.map((color, index) => `--color-${index + 1}: ${color};`).join("\n")}
    }`;
    const blob = new Blob([css], {type: "text/css"});
    const url = URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.download = parseInt(name) + 1 + ".css";
    link.href = url;
    link.click();
}
function download_palette_json(colors, name) {
    const json = JSON.stringify(colors);
    const blob = new Blob([json], {type: "application/json",});
    const url = URL.createObjectURL(blob);
    const link = doc.createElement("a");
    link.download = parseInt(name) + 1 + ".json";
    link.href = url;
    link.click();
}
// Choose the code format
function show_palette(format, target, palette, card_class_name){
    const paletteColors = palette.querySelectorAll(`.${card_class_name}`);
    const colors = [];
    paletteColors.forEach((color) => colors.push(color.style.backgroundColor));
    switch (format) {
        case "css": show_palette_css(colors, target); break;
        case "json": show_palette_json(colors, target); break;
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
listsOptions(ready_color_type, ready_palettes_num, ready_color_num, readyColorSubmit, palettes);
readyColorSubmit.addEventListener("click", (color)=>{
    generateReadyPalettesHtml(color);
    select_templates(palettes, generateRandomRgbColors(currentCount), download_palettes, "palette", "color");
    checkInputs(palettes, ready_color_type, ready_palettes_num, ready_color_num);
});

// generate ready colors templates
function generateReadyPaletteHtml(type, container){
    let color = currentColor;
    let count = currentColorCount;
    const hsl = getHslFromColor(color);
    if(!hsl) return;
    let palette = [];
    container.innerHTML = "";
    palette = generateImagePalette(hsl, type, count);
    palette?.forEach((color)=>{
        const palette_color = doc.createElement("div");
        palette_color.classList.add("palette_color");
        if (screen.width < 768) {
            palette_color.style.width = `calc(100%/${currentColorCount} - 20px)`;
            if (currentColorCount > 4) {
                palette_color.style.fontSize = "10px";
                palette_color.style.width = "100px";
            }
        }
        const colorInfo = colorAPI+`id?format=hsl&hsl=${rgbToHsl(color)}`;
        fetch(colorInfo)
        .then(response => response.json())
        .then(colorName =>{
            palette_color.innerHTML = `<div class="color" style="background-color: rgb(${color});"></div>
                                        <div class="color-names">
                                            <h4>${HslToHex(color)}</h4>
                                        </div>`;
            palette_color.addEventListener("mouseenter", ()=>{
                palette_color.style.height = "62vh";
                palette_color.children[0].style.height = "70%";
                palette_color.children[0].innerHTML = `<h4 class="colorName">${colorName.name.value}</h4>`;
                if (palette_color.children[1].children.length === 1) {
                    palette_color.children[1].innerHTML += `<h4>${colorName.rgb.value}</h4>
                                                            <h4>${colorName.cmyk.value}</h4>
                                                            <h4>${colorName.hsl.value}</h4>`;
                }
            });
            palette_color.addEventListener("mouseleave", ()=>{
                setTimeout(()=>{
                    palette_color.style.height = "30vh";
                    palette_color.children[0].style.height = "85%";
                    palette_color.children[0].innerHTML = "";
                    if (palette_color.children[1].children.length === 4) palette_color.children[1].innerHTML = `<h4>${HslToHex(color)}</h4>`;
                });
            });
        });
        palette_color.addEventListener("click",(e)=> copyColorNameType(e));
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
// generate whole ready templates
function generateReadyPalettesHtml(color){
    color = generateRandomRgbColors(currentCount);
    palettes.style.display = "block";
    palettes.innerHTML = "";
    for (let i = 0; i < color.length; i++) {
        currentColor = color[i];
        const palette = doc.createElement("div");
        const palette_title = doc.createElement("div");
        const palette_colors = doc.createElement("div");
        palette.classList.add("palette");
        palette_title.classList.add("palette-title");
        palette_colors.classList.add("palette-colors");
        palette_title.innerHTML = `<h3>التنسيق ${i + 1}:</h3>`
        generateReadyPaletteHtml(currentType, palette_colors);
        palette.appendChild(palette_title);
        palette.appendChild(palette_colors);
        palettes.appendChild(palette);
    }
}
// call it when the site loaded
window.onload= generateReadyPalettesHtml();
window.onload = select_templates(palettes, generateRandomRgbColors(currentCount), download_palettes, "palette", "color");
// Check the inputs
function checkInputs(templates, type, num1, num2) {
    if (type.value === "") templates.innerHTML = `<p class="search-title">يجب عليك اختيار نمط تنسيق معين</p>`;
    if (num1.value < 2) templates.innerHTML = `<p class="search-title">يجب عليك اختيار عدد التنسيقات الذي تريده بشكل صحيح</p>`;
    else if (num1.value > 200) templates.innerHTML = `<p class="search-title">عدد التنسيقات الذي اخترته عالي جداً, يرجى اختيار عدد اقل من  200</p>`;
    if (num2.value === "") templates.innerHTML = `<p class="search-title">يجب عليك اختيار عدد الألوان ضمن التنسيق الواحد</p>`;
}
// lists options
function listsOptions(type, palettes, colors, submit, container) {
    type.addEventListener("change", (e)=>{
        palettes.style.display = "block";
        const value = e.target.value;
        currentType = value;
        triadicAndTetradicColorCount(type, palettes, colors, submit);
    });
    palettes.addEventListener("input", (e)=>{
        colors.style.display = "block";
        const value = e.target.value;
        currentCount = value;
    });
    colors.addEventListener("change", (e)=>{
        submit.style.display = "block";
        const value = e.target.value;
        currentColorCount = value;
    });
    checkInputs(container, type, palettes, colors);
}
// Color Search
color_img.addEventListener("input", ()=>{
    const img_path = color_img.value;
    search_input.value = img_path.substr(img_path.lastIndexOf("\\")+1, img_path.length);
});
search_button.addEventListener("click", (e)=>{
    e.preventDefault();
    const color_type = search_input.value;
    const search_color_api = generateColorAPI(color_type);
    generateColorInfoHtml(search_color_api);
});
function generateColorAPI(color_type){
    let colorInfo;
    if ((color_type.at(0) === "r" || color_type.at(0) === "R") && (color_type.at(1) === "g" || color_type.at(1) === "G") && (color_type.at(2) === "b" || color_type.at(2) === "B") && color_type.at(3) === "(" && color_type.at(color_type.length - 1) === ")") {
        const r = parseInt(color_type.substring(color_type.indexOf("(") + 1, color_type.indexOf(",")));
        const g = parseInt(color_type.substring(color_type.indexOf(",") + 1, color_type.lastIndexOf(",")));
        const b = parseInt(color_type.substring(color_type.lastIndexOf(",") + 1, color_type.indexOf(")")));
        if (r > 255 || r < 0 || g > 255 || g < 0 || b > 255 || b < 0) search_color_info.innerHTML = `<p class="search-title">قيمة اللون غير صحيحة</p>`;
        else colorInfo = colorAPI+`id?format=rgb&rgb=${color_type}`;
    } else if (color_type.at(0) === "#" && color_type.length === 4 || color_type.length === 7) {
        const hex_clean = color_type.substr(1, color_type.length);
        if (isValidColor(color_type)) colorInfo = colorAPI+`id?format=hex&hex=${hex_clean}`;
        else if (hex_clean.includes("A") || hex_clean.includes("B") || hex_clean.includes("C") || hex_clean.includes("D") || hex_clean.includes("E") || hex_clean.includes("F")) search_color_info.innerHTML = `<p class="search-title">الحروف الموجودة يجب ان تكون صغيرة</p>`;
        else search_color_info.innerHTML = `<p class="search-title">قيمة اللون غير صحيحة</p>`;
    }
    else if ((color_type.at(0) === "h" || color_type.at(0) === "H") && (color_type.at(1) === "s" || color_type.at(1) === "S") && (color_type.at(2) === "l" || color_type.at(2) === "L") && color_type.at(3) === "(" && color_type.at(color_type.length - 1) === ")"){
        const h = parseInt(color_type.substring(color_type.indexOf("(") + 1, color_type.indexOf(",")));
        const s = parseInt(color_type.substring(color_type.indexOf(",") + 1, color_type.lastIndexOf(",")));
        const l = parseInt(color_type.substring(color_type.lastIndexOf(",") + 1, color_type.indexOf(")")));
        if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) search_color_info.innerHTML = `<p class="search-title">قيمة اللون غير صحيحة</p>`;
        else colorInfo = colorAPI+`id?format=hsl&hsl=${color_type}`;
    }
    else if ((color_type.at(0) === "h" || color_type.at(0) === "H") && (color_type.at(1) === "s" || color_type.at(1) === "S") && (color_type.at(2) === "v" || color_type.at(2) === "V") && color_type.at(3) === "(" && color_type.at(color_type.length - 1) === ")"){
        const h = parseInt(color_type.substring(color_type.indexOf("(") + 1, color_type.indexOf(",")));
        const s = parseInt(color_type.substring(color_type.indexOf(",") + 1, color_type.lastIndexOf(",")));
        const v = parseInt(color_type.substring(color_type.lastIndexOf(",") + 1, color_type.indexOf(")")));
        if (h < 0 || h > 360 || s < 0 || s > 100 || v < 0 || v > 100) search_color_info.innerHTML = `<p class="search-title">قيمة اللون غير صحيحة</p>`;
        else colorInfo = colorAPI+`id?format=hsl&hsl=${color_type}`;
    }
    else if ((color_type.at(0) === "c" || color_type.at(0) === "C") && (color_type.at(1) === "m" || color_type.at(1) === "M") && (color_type.at(2) === "y" || color_type.at(2) === "Y") && (color_type.at(3) === "k" || color_type.at(3) === "K") && color_type.at(4) === "(" && color_type.at(color_type.length - 1) === ")"){
        const c = parseInt(color_type.substring(color_type.indexOf("(") + 1, color_type.indexOf(",")));
        const m = parseInt(color_type.substring(color_type.indexOf(",") + 1, color_type.indexOf(",", 6)));
        const y = parseInt(color_type.substring(color_type.indexOf(",", 6) + 1, color_type.lastIndexOf(",")));
        const k = parseInt(color_type.substring(color_type.lastIndexOf(",") + 1, color_type.indexOf(")")));
        if (c < 0 || c > 100 || m < 0 || m > 100 || y < 0 || y > 100 || k < 0 || k > 100) search_color_info.innerHTML = `<p class="search-title">قيمة اللون غير صحيحة</p>`;
        else colorInfo = colorAPI+`id?format=hsl&hsl=${color_type}`;
    }
    else if ((color_type.at(0) === "x" || color_type.at(0) === "X") && (color_type.at(1) === "y" || color_type.at(1) === "Y") && (color_type.at(2) === "z" || color_type.at(2) === "Z") && color_type.at(3) === "(" && color_type.at(color_type.length - 1) === ")"){
        const x = parseInt(color_type.substring(color_type.indexOf("(") + 1, color_type.indexOf(",")));
        const y = parseInt(color_type.substring(color_type.indexOf(",") + 1, color_type.lastIndexOf(",")));
        const z = parseInt(color_type.substring(color_type.lastIndexOf(",") + 1, color_type.indexOf(")")));
        if (x < 0 || x > 95.047 || y < 0 || y > 100 || z < 0 || z > 108.883) search_color_info.innerHTML = `<p class="search-title">قيمة اللون غير صحيحة</p>`;
        else colorInfo = colorAPI+`id?format=hsl&hsl=${color_type}`;
    }
    else search_color_info.innerHTML = "<p class='search-title'>هذه القيمة لا تمثل أي نوع من قيم الألوان (لا يمكن استخدام الأسماء أو اللغة العربية هنا)</p>"
    return colorInfo;
}
function generateColorInfoHtml(color_api){
    color_api = color_api.replaceAll("%", "");
    search_type.style.display = "none";
    fetch(color_api)
    .then(response => response.json())
    .then(data => {
        search_more_info.innerHTML = "";
        search_color_info.innerHTML = "";
        search_color_info.innerHTML += `
            <div class="search-color">
                <h3 class="color-title">اسم هذا اللون هو:</h3>
                <p class="color-value">${data.name.value}</p>
            </div>
            <div class="search-color">
                <h3 class="color-title">القيمة الست عشرية هي:</h3>
                <p class="color-value">${data.hex.value}</p>
            </div>
            <div class="search-color">
                <h3 class="color-title">قيمة ال rgb:</h3>
                <p class="color-value">${data.rgb.value}</p>
            </div>
            <div class="search-color">
                <h3 class="color-title">قيمة ال cmyk:</h3>
                <p class="color-value">${data.cmyk.value}</p>
            </div>
            <div class="search-color">
                <h3 class="color-title">قيمة ال hsl:</h3>
                <p class="color-value">${data.hsl.value}</p>
            </div>
            <div class="search-color">
                <h3 class="color-title">قيمة ال hsv:</h3>
                <p class="color-value">${data.hsv.value}</p>
            </div>
            <div class="search-color">
                <h3 class="color-title">قيمة ال xyz:</h3>
                <p class="color-value">${data.XYZ.value}</p>
            </div>
            <div class="search-color">
                <h3 class="color-title">صورة اللون:</h3>
                <img src="${data.image.bare}" alt="search color image" class="search-color-image"/>
            </div>
        `;
        search_type.style.display = "block";
        search_submit.addEventListener("click", ()=>{
            search_color_template.innerHTML = "";
            currentColor = search_input.value;
            const colors_cards = doc.createElement("div");
            colors_cards.classList.add("colors-cards");
            colors_cards.setAttribute("value", 0);
            generateImagePaletteHtml(currentType, colors_cards, search_more_info);
            search_color_template.appendChild(colors_cards);
            select_templates(search_color_template, [currentColor], download_color_palette, "colors-cards", "color-card")
        });
        listsOptions(search_type, search_type, search_color_num, search_submit, search_color_template);
    });
}
search_color_info.addEventListener("click",(e)=>{
    if (e.target.classList.contains("color-value")) copyColorNameType(e);
});
// Menu for mobiles
function burger_menu() {
    var nav = doc.querySelector(".nav");
    var nav_list = doc.querySelector("#nav-list");
    if (nav.style.height === "19vh") {
        nav.style.height = "50vh";
        nav_list.style.display = "block";
    } else {
        nav.style.height = "19vh";
        nav_list.style.display = "none";
    }
}