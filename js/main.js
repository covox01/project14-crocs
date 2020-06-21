var copyEase = Back.easeInOut.config(4)
var crocEase1 = Power3.easeInOut
var crocEase2 = Back.easeOut.config(2)
var t = .5
var copyValue = document.querySelector("#text-c")

function start(){
   var tl = new TimelineMax({})

   gsap.set(".copy", { transformOrigin: "center center", scale: 1, opacity: 1})
   gsap.set("#croc", { transformOrigin: "center center", x: 10, y: 200, rotation: 0, opacity: .3})
   gsap.set("#clip-1", { y: 10})

   tl.to("#croc", .4, {  y: -05, rotation: 2, opacity: 1, ease: crocEase1})
   .to("#croc", .3, {rotation: 0, x: 0, y: 0, ease: crocEase2}, "sync")
   .to("#clip-1", .2, {y: 30, opacity: 0}, "sync")
   .staggerFrom(".copy", t, { opacity: 0, scale: .5, ease: copyEase }, .05, "-=.6")

   gsap.delayedCall(1.3, clearProp)
}

function clearProp(){
   gsap.set(".copy", {clearProps: "transform", onComplete: endSet})
}

function endSet(){
   
   var scaleReset = gsap.getProperty(copyValue, "x")
   gsap.set(".copy", {transformOrigin: "center center"})
   if (scaleReset === 0) {
      end()
   }
}

function end(){
   var tl = new TimelineMax()

   gsap.set("#croc", {transformOrigin: "50 center"})
   tl.to("#croc", .2, {y: -7, rotation: 0, ease: crocEase1})
   .to("#croc", .35, {x: -40, y: 160, rotation: -20, opacity: .5, ease: crocEase1})
   .to("#clip-1", .2, { y: 0, opacity: 1 }, "-=.35")
   .staggerTo(".copy", t, {opacity: 0, scale: .6, ease: copyEase}, .05, "-=.3")

   gsap.delayedCall(1, set)
}

function set(){
   gsap.set(".copy", { transformOrigin: "center center", clearProps: "scale"})
   gsap.set("#croc", { transformOrigin: "center center", scale: 1, x: 0, y: 0, rotation: 0, opacity: 0, clearProps: "transform"})
   gsap.set("#clip-1", { y: 0, clearProps: "transform"})

   gsap.delayedCall(1, start)
}

// Init Stage
function init(){
   gsap.set("#logo", {opacity: 1, xPercent: -50, yPercent: -50, onComplete: start})
}

init()