var currency;
var bigT = false;

function showPrompt(text, type, after) {
    if(!after) {
        after = function() {}
    }
    $("#" + type + "-prompt").css("display", "block");
    $("#" + type + "-prompt span.text").html(text);
    $("#mask").css("display", "unset");
    $("#" + type + "-prompt button").click(function () {
        $("#" + type + "-prompt").css("display", "");
        $("#counter").text(currency + localStorage.clicks);
        $("#mask").css("display", "");
        if(!after())
        {
            checkEvents()
        }

    })
}

function drawBoys() {
    $("#boys *").remove()
    var i;
    var boys = ["Kiwi", "Shano", "Greece", "Badeli", "Sackett", "Jonesy", "Rob"];
    var money = localStorage.boys.split(";");
    for(i = 0; i < 7; i++)
    {
        $("#boys").append("<div class=\"boy\">"+boys[i]+": <span class='money'>€"+money[i]+"</span></div>")
    }
}

function spawnBigT()
{
    if(!bigT)
    {
        bigT = true;
        var posx = (Math.random() * ($(document).width() - 211)).toFixed();
        var posy = (Math.random() * ($(document).height() - 262)).toFixed();
        $("body").append($("<img id=\"bigT\" src='img/bigt.png'>")
            .css({
                "position": "absolute",
                "top": posy + "px",
                "left": posx + "px"
            }).click(function() {
                localStorage.gonzo = (Number(localStorage.gonzo) + Math.random() * 100).toFixed();
                $("#gonzo span").text(localStorage.gonzo);
                bigT = false;
                $(this).remove();
            }))
    }
}

function update()
{
    if(Math.random() < 0.05)
    {
        spawnBigT()
    }
}

function drawHearts() {
    for (let i = 0; i < 3; i++) {
        // noinspection HtmlUnknownTarget
        if(i < Number(localStorage.health)) {
            $("#health").append("<img class=\"heart\" src=\"img/heart.png\">")
        }
        else {
            $("#health").append("<img class=\"empty\" src=\"img/empty.png\">")
        }
    }
}

function removeHeart() {
    localStorage.health = Math.max(0,Number(localStorage.health) - 1)
    $("#health .heart").last().attr("src","img/empty.png").removeClass("heart").addClass("empty");
}

function checkEvents() {
    if(localStorage.gameOver) {
        let el = $("<div id=\"game-over\">GAME OVER</div>").css({
            "position": "absolute",
            "top": "0",
            "bottom": "0",
            "left": "0",
            "right": "0",
            "font-size": "250px",
            "font-family": "Montserrat Black",
            "background": "black",
            "color": "red",
            "justify-content": "center",
            "display": "flex",
            "align-items": "center",
            "z-index": 10
        });
        $("body").append(el)
        return;
    }
    if(localStorage.clicks >= 130 && localStorage.stage === "0")
    {
        $("#choice-prompt").css("display", "unset");
        $("body").append("<img id=\"bois\" src=\"img/bois.png\">");
        $("#mask").css("display", "unset");
        $("#choice-prompt .text").text("You're in Amsterdam so obviously you are going to go to the Red Light District. While you're here you may as well get a prostitute, right?")
        $("#yes").click(function() {
            $("#choice-prompt").css("display", "");
            $("#bois").remove();
            showPrompt("Turns out she \"knew you were a virgin\" and you ended up spending all your money on a lazy handjob. Big T's money's gone to good use.", "good")
        });
        var count = 0;
        $("#no").click(function() {
            $("#bois").animate({"width": "+=10%"}, 0)
            count += 1;
            var text;
            switch(count)
            {
                case 1:
                    text = "Go for it Huw, you said you wanted it!";
                    break;
                case 2:
                    text = "It's fine to do it, c'mon!";
                    break;
                case 3:
                    text = "But there's a really fit one...";
                    break;
                case 4:
                    text = "Even those Norwegian dudes said you should though!"
                    break;
                case 5:
                    text = "But you said you really wanted to do it before!"
                    break;
                default:
                    text = "C'mon just do it! We won't judge you for it!"
                    break;
            }
            $("#choice-prompt .text").text(text);
        });
        localStorage.stage = 1;
        localStorage.clicks = "0.00"
    }
    else if (localStorage.clicks >= 250 && localStorage.stage === "1") {
        showPrompt("Turns out that your travel card had pounds on it instead of euros, " +
            "which obviously means you can't use it and you've lost all that money.<br>" +
            "Looks like your going to have to be a stingy bastard for the rest of the trip.", "bad");
        currency = "€";
        localStorage.stage = 2
        localStorage.clicks = "0.00";
    }
    else if (localStorage.health === "0") {
        showPrompt("You've snapped at your friends one too many times. This time they snap back and you get punched in the nuts by a small Indian boy.", "bad", function() {
            let el = $("<div id=\"game-over\">GAME OVER</div>").css({
                "position": "absolute",
                "top": "0",
                "bottom": "0",
                "left": "0",
                "right": "0",
                "font-size": "250px",
                "font-family": "Montserrat Black",
                "background": "black",
                "color": "red",
                "justify-content": "center",
                "display": "flex",
                "align-items": "center",
                "opacity": "0"
            });
            $("body").append(el)
            let go = new Audio("mp3/gameover.mp3");
            go.volume = 0.1
            go.play().then();
            el.animate(
                {"opacity": 1}, 2000
            );
            localStorage.gameOver = true
            return true;
        });

    }
}

$(document).ready(function () {
    if (!localStorage.clicks) {
        localStorage.clicks = "0.00";
    }
    if (!localStorage.stage) {
        localStorage.stage = 0;
    }
    if(!localStorage.gonzo) {
        localStorage.gonzo = 1;
    }
    if(localStorage.stage < 2) {
        currency = "£";
    }
    else {
        currency = "€";
    }
    if (!localStorage.health) {
        localStorage.health = 3;
    }
    if(!localStorage.boys) {
        localStorage.boys = "50;50;50;50;50;50;50"
    }
    drawBoys()
    $("#gonzo span").text(localStorage.gonzo);
    checkEvents();
    drawHearts()
    $("#counter").text(currency + localStorage.clicks);
    $("#huw").click(function (e) {
        let boys = localStorage.boys.split(";");
        while(localStorage.boys != "0;0;0;0;0;0;0") {
            let i = Math.floor(Math.random() * 7);
            if(boys[i] == 0)
            {
                continue;
            }
            boys[i] = (boys[i] - 0.01 * localStorage.gonzo).toFixed(2)
            if (boys[i] <= 0) {
                boys[i] = "0"
            }
            break;
        }
        localStorage.boys = boys.join(";");
        if(localStorage.boys == "0;0;0;0;0;0;0")
        {
            localStorage.win = true;
            showPrompt("Good job, you won! You fucked over all the boys. What a great holiday!", "good", function() {
                let el = $("<div id=\"win\"><img src='img/tfwwin.png'><span>YOU WIN</span></div>");
                $("body").append(el);
                el.animate(
                    {"opacity": 1}, 2000
                );
            });
        }
        drawBoys()
        localStorage.clicks = (Number(localStorage.clicks) + 0.01 * localStorage.gonzo).toFixed(2);
        $("#counter").text(currency + localStorage.clicks);
        checkEvents();
        e.preventDefault();
    }).mousedown(function () {
        $("#huw, #huw-img").css("transform", "scale(0.955)");
    })
        .mouseup(function () {
            $("#huw, #huw-img").css("transform", "");
        }).hover(function () {
        $("#huw, #huw-img").addClass("hover")
    }, function () {
        $("#huw, #huw-img").css("transform", "").removeClass("hover");
    });
    $("#reset").click(function () {
        localStorage.removeItem("gameOver");
        localStorage.clicks = "129.90";
        localStorage.stage = "0"
        localStorage.removeItem("lastClicked");
        localStorage.health = "3"
        localStorage.gonzo = 1
        localStorage.boys = "50;50;50;50;50;50;50"
        currency = "£"
        $("#counter").text(currency + localStorage.clicks);
        $("#health .heart, #health .empty").remove();
        drawBoys();
        drawHearts()
    }).dblclick(function () {
        localStorage.removeItem("gameOver");
        localStorage.clicks = "0.00";
        localStorage.stage = "0"
        localStorage.removeItem("lastClicked");
        localStorage.health = "3"
        localStorage.gonzo = 1
        localStorage.boys = "50;50;50;50;50;50;50"
        currency = "£"
        $("#counter").text(currency + localStorage.clicks);
        $("#health .heart, #health .empty").remove();
        drawBoys();
        drawHearts();
    });
    $("#girl-msging-device img").click(function () {
        if(localStorage.lastClicked)
        {
            let lastClicked = moment(localStorage.lastClicked);
            if(moment().diff(lastClicked) < 600000)
            {
                showPrompt("Big T had a go at you for asking for money too often. You lose one heart of mental health. Looks like the only way to deal with this is to take it out on your friends.", "bad")
                removeHeart();
                checkEvents();
                return
            }
        }
        localStorage.lastClicked = moment().format();
        showPrompt("Big T gives you money. Oh looks like its enough for a lazy handjob. Not enough to buy any rounds though.", "good");
        localStorage.clicks = (Number(localStorage.clicks) + 100).toFixed(2);
    }).mousedown(function () {
        $(this).css("transform", "scale(0.955)");
    }).mouseup(function () {
        $(this).css("transform", "");
    });
    window.setInterval(update, 1000);
});
