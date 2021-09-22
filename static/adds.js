const exclArr = ['labels', 'strep', 'id'];
let inlevel = 0;
let curdict = {};
let SORTED = '';


document.addEventListener('DOMContentLoaded', () => {
    for (let el of document.querySelectorAll(".index_3")) {
        el.addEventListener('click', function(e) {
            if (el.id) { getStatus(el.id) }
        });
    };
});

function checkFilter(that, model) {
    if (that.value == "") {
        for (let el of document.querySelectorAll("#filter2")) {
            el.style.display = "none";
        }
        getStatus(model)
    } else {
        for (let el of document.querySelectorAll("#filter2")) {
            el.style.display = "block";
        }
    }
}



function applyOrder(sort) {
    if (sort != 'date') {
        if (sort === SORTED) { sort = '-' + sort }
        a = "o=" + sort;
        applyFilter('ranges', a)
        SORTED = sort
    }
}

function applyFilter(model, sort = '') {
    a = document.getElementById("param1").value;
    b = document.getElementById("param2").value;
    c = document.getElementById("param3").value;
    d = "/?" + a + b + "=" + c
    if (sort) {
        if (a) { d = d + "&" + sort } else { d = "/?" + sort }

    }
    getStatus(model, d)
}


function getStatus(id, params = "") {
    url = `/api/v2/${id}${params}`.replace('#', ''),
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let head = {}
            let b = 0;
            let tt = typeof(data);
            let d = data["results"];
            if (d) {
                b = d.length;
                head['next'] = data.next;
                head['previous'] = data.previous;
            } else {
                d = data;
                b = d.length;
            }
            if (b) {
                inlevel = 1;
                tt = Object.keys(d[0]).length;
                if (tt) { draw_rqs(d, b, tt, head, id) }
            } else {
                tt = Object.keys(d).length;

                head['back'] = id;
                inlevel = 1;
                draw_rqs(d, 1, tt, head, id);

            }

        });
}

function draw_rqs(data, r = 0, c = 0, head = {}, id = '') {
    let lctn = window.location.href;
    if (!data.length) { data[0] = data }
    let n = document.querySelector(".index_1");
    if (n && n.style.display === 'block') { n.style.display = 'none' }
    let tbx = "<div class='index_5'>";
    tbx += "<div class='index_4'>"
    if (head['previous']) {
        let q = head['previous'].split('/')
        let p = q.slice(Math.max(q.length - 2, 0)).join('/')
        tbx += "<div class='index_3' id=" + p + " onclick='getStatus(this.id)'>Предыдущая страница</div>"
    } else { tbx += "<div class='index_3 index_6'>Предыдущая страница</div>" }
    if (head) {

        if (head['next']) {
            let q = head['next'].split('/')
            let p = q.slice(Math.max(q.length - 2, 0)).join('/')
            tbx += "<div class='index_3' id=" + p + " onclick='getStatus(this.id)'>Следующая страница</div>"
        } else { tbx += "<div class='index_3 index_6'>Следующая страница</div>"; }
        tbx += "<div class='index_3' onclick='getBack(this)'>Назад</div>";
        tbx += "<div class='index_3' id=" + id + " onclick='getBl(this.id)'>Создать</div>";
        tbx += "</div>";
    }
    tbx += "<table><thead><tr>";
    for (let i = 0; i < c; i++) {
        let q = Object.keys(data[0])[i];
        try {
            if (exclArr.indexOf(q) >= 0) {
                c -= 1
            } else {
                tbx += "<th style='cursor:pointer' id=" + q + " onclick='applyOrder(this.id)'>" + Object.values(data[0]['labels'])[i] + "</th>";
            }
        } catch { tbx += "<th>" + q + "</th>"; }

    }
    tbx += "</tr></thead>"
    for (let i = 0; i < r; i++) {
        let s1 = "getBl('" + id + "','" + data[i]['id'] + "')";
        let s = "<tbody><tr class='index_3' onclick=" + s1 + " title='Редактировать'>";
        tbx += s
        for (let j = 0; j < c; j++) {
            itm = Object.values(data[i])[j]
            if (exclArr.indexOf(Object.keys(data[i])[j]) < 0) {
                tbx += "<th>" + itm + "</th>";
            }
        }
        tbx += "</tbody></tr>";
    }
    tbx += "</table>";
    tbx += "<button onclick='getForm(" + id + ")>Создать</button>";
    tbx += "</div>";
    document.querySelector("#index001").innerHTML = tbx;
}

function getBack(e) {
    let rend = ('<div class="index_1"><div class="index_2"><div class="index_3" id="ranges" onclick=getStatus(this.id)>' +
        'Таблица количества и расстояния</div></div></div>')
    document.querySelector("#index001").innerHTML = rend;
}

async function postForm(url = '', data = {}, metod = 'PUT') {
    const response = await fetch(url, {
        method: metod,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response.json();
}

function sendform(form, model, id = '', frm) {
    modl = model.split('/')[0];
    if (id) {
        url = `${window.location.href}api/v2/${modl}/${id}/`.replace('#', '');
    } else {
        url = `${window.location.href}api/v2/${modl}/`.replace('#', '');
    }
    let res = {}
    for (let fs of form.elements) {
        res[fs.name] = addVal(fs);
    }
    if (id) {
        postForm(url, res, 'PUT')
            .then((data) => {
                console.log(data);
                form.parentNode.parentNode.innerHTML = '';
                inlevel -= 1;
                getStatus(model);
            });

    } else {
        postForm(url, res, 'POST')
            .then((data) => {
                let fid = form.parentNode.parentNode.parentNode.id;
                form.parentNode.parentNode.innerHTML = '';

                if (inlevel > 2) {
                    let aa = document.getElementById(curdict[inlevel][0]);
                    let qq = aa.dataset.fld;
                    let opt1 = document.createElement("option");
                    opt1.value = data.id.toString();
                    opt1.text = data.strep;
                    opt1.selected = true;
                    aa.elements[qq].add(opt1);
                    aa.elements[qq].value = opt1.value;
                }
                delete curdict[inlevel];
                inlevel -= 1;
                console.log(data);
                if (inlevel == 1) {
                    getStatus(modl)
                }
                if (frm) {}
            });
    }
}

function addVal(item) {
    let typ = item.type,
        val = item.value;
    switch (typ) {
        case 'select-multiple':
            let lst = [];
            for (let i of item.options) {
                if (i.selected) { lst.push(i.value) }
            }
            return lst;
        case 'checkbox':
            return item.checked;
        case "file":
            return item.files[0];
        default:
            return val
    }
}

function getBl(model, id = 0) {
    modl = model.split('/')[0];
    if (id) { url = `${window.location.href}api/v2/edit/${modl}/${id}/`.replace('#', '') } else { url = `${window.location.href}api/v2/new/${modl}/`.replace('#', '') }

    fetch(url)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            inlevel += 1;
            drw_frm(data, modl);

        });
}

function drw_frm(data, model, num = '', fld = '') {

    iden = "#index00" + inlevel.toString();
    document.querySelector(iden).innerHTML = data;
    startTbl();
    document.getElementById(model).dataset.fld = fld;
    document.getElementById("exit_button").onclick = function(event) { this.parentNode.parentNode.innerHTML = '' };
}

function cleanFrm(el, lvl = 1) {
    if (lvl == 1) { el.parentNode.innerHTML = '' }
    if (lvl == 2) { el.parentNode.parentNode.innerHTML = '' }

}

function startTbl() {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c, i) => slots.has(c) ? j = i + 1 : j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                let r1 = Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
                return r1
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    let res = i < 0 ? prev[prev.length - 1] : back ? prev[i - 1] || first : i;
                    return res;
                });
                el.value = clean(el.value).join ``;
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value = ""));
    }
};