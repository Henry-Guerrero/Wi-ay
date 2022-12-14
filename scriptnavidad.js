const colores = ["null", 
"#FFFF00",
"#00CCFF", "#00CCFF", 
"#FF3399", "#FF3399", "#FF3399", 
"#00FFFF", "#00FFFF","#00FFFF", "#00FFFF", 
"#9966FF", "#9966FF", "#9966FF", "#9966FF", "#9966FF",
"#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00",
"#FF0000","#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000",
"#99FF00","#99FF00", "#99FF00", "#99FF00", "#99FF00", "#99FF00", "#99FF00", "#99FF00"];

const tiempo = ["null", 
".2s", 
".3s", ".3s", 
".4s", ".4s", ".4s", 
".5s", ".5s", ".5s", ".5s", 
".6s", ".6s", ".6s", ".6s", ".6s", 
".7s", ".7s", ".7s", ".7s", ".7s", ".7s",
".8s", ".8s", ".8s", ".8s", ".8s", ".8s", ".8s",
".9s", ".9s", ".9s", ".9s", ".9s", ".9s", ".9s", ".9s"];


for (let i = 1; i <= 36; i++) {
       
    let foco = ".a"+i;
    let a = document.querySelector(foco);
    a.style.setProperty("animation-delay", tiempo[i]); 
    
    a.style.setProperty("--color", colores[i]); 
    a.style.setProperty("background", "var(--color)"); 

}