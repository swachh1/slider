const showMoreButton = document.querySelectorAll(".btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const title = document.querySelector(".modal-title");
const paragraph = document.querySelector(".under-title");
const image = document.querySelector(".modal-img");
const close = document.querySelector(".close");
const texti = document.querySelector(".about");
// const texti2 = document.querySelectorAll(".texti1");

//open mmodal

const modalOpen = function (e) {
  //ოვერლეის და მოდალს რომ გაუქრეს ჰიდენ კლასი
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  //texti2.classList.remove("hidden");
  //როგორ მივწვდეთ შოუმორბათენში კონკრეტულ ელემენტს ამ შემთხვევაში თაითლს.
  const fakeTitle = e.target.parentElement.firstElementChild.textContent;
  title.textContent = fakeTitle;
  paragraph.textContent = `ეს ჩემისა არის : ${fakeTitle}`;
  const cardImage = e.target.parentElement.children[1].getAttribute("src");
  image.firstElementChild.setAttribute("src", cardImage);
  // const cardText = e.target.parentElement.children[4].textContent;
  // texti.textContent = cardText;
};

//შოუმორ ბათონს რომ დააკლიკავ გამოიძახეს მოდალს.
showMoreButton.forEach((a) => a.addEventListener("click", modalOpen));

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

close.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//სლაიდერის ფუნქცია
const sliderr = function () {
  //აქ ვწვდებით ჰტმლში სლაიდერის კონტეინერს, ბექ და ნექსთ ბათონებს.
  const slider = document.querySelectorAll(".slider");
  const next = document.querySelector(".next");
  const back = document.querySelector(".back");
  const dotebi = document.querySelector(".dots");
  // მაქსლაიდი უდრის სლაიდერის სიგრძეს ანუ ჩვენ შემთხვევაში 5ს რადგან სულ გვაქვს 5 ქარდი.
  const maxSlide = slider.length;
  // ლეტ ცვლადი იმიტომ გვინდა რომ როცა კონკრეტულ ცვლადზე დავდგებით 0 შეიცვალოს იმ ნუმერაციით
  //რომელზეც ვდგავართ.
  let curSlide = 0;

  //გოუთუსლაიდ ფუქნცია გვინდა იმისთვის რომ გაიცენტროს ის ქარდი რომელზეც გადავდივართ,
  // დანარჩენები კი ჩაჩოჩდნენ. forEach ს გადავეცით ორი არგუმენტი, ერთი არის თვითონ ელემენტი
  // და მეორე ამ ელემენტის ნუმერაცია, მაგალითად თუ ვდგავართ მესამე ელემენტზე curSlide გახდება
  // -3 და ტრანსფორმით გადატრანსლეიტდება Xღერძზე -300% ით.
  const goToSlide = function () {
    slider.forEach(
      (a, i) => (a.style.transform = `translateX(${(i - curSlide) * 100}%)`)
    );
  };
  //ნექსთსლაიდის ფუნქცია გვჭირდება რომ "შემდეგი" ღილაკი ავამოქმედოთ, ანუ თუ curSlide
  //ანუ ის ქარდი რაზეც ეხლა ვდგავართ უდრის MaxSlide -1 ს ანუ ბოლო ქარდს (ანუ ვდგავართ ბოლო ქარდზე ეხლა)
  // მაშინ curSlide გაუტოლდეს 0ს ანუ დაგვაბრუნოს პირველ ქარდზე, და წინააღმდეგ შემთხვევაში,
  //ანუ  თუ არ ვდგავართ ბოლო ქარდზე ახლა, ერთით გაიზარდოს curSlide  ანუ გადავიდეს რიგით
  //მომდევნო ქარდზე.
  // და შემდეგ გავუშვათ goToSlide ფუნქცია რათა ის ქარდი რომელზეც დავდგებით გაიცენტროს და
  //დანარჩენები ჩაჩოჩდნენ
  const nextSlide = function () {
    curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
    goToSlide();
  };
  //პრევსლაიდი გვჭირდება რომ "წინა" ღილაკი ავამოქმედოთ, თუ curSlide, იგივე ის ქარდი რომელზეც ახლა ვდგავართ
  // არის ტოლი 0 ის, ანუ ის ქარდი რომელზეც ვდგავართ არის რიგით პირველი ქარდი.
  //მაშინ CurSlide გაუტოლდეს maxSlide-1 ს ანუ თუ ვდგავართ რიგით პირველ ქარდზე გადაგვიყვანოს , რიგით ბოლო ქარდზე
  // წინააღმდეგ შემთხვევაში, ანუ თუ ახლა არ ვდგავართ პირველ ქარდზე ანუ curSlide არ უდრის 0ს,
  // ერთით შეამციროს curslide ანუ იმ ქარდის რიგით წინა ქარდზე გადაგვიყვანოს რომელზეც ეხლა ვდგავართ
  //რათა მივუახლოვდეთ ერთით პირველ ქარდს.
  //და ისევ ვუშვებთ გოსლაიდს.
  const prevSlide = function () {
    curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
    goToSlide();
  };
  //აქ ივენთლისენერებს ვამაგრებთ ბათონებზე რათა დაკლიკების შემდეგ გაეშვას, პრევსლაიდ და ნექსთსლაიდ ფუქნციები
  //და კიდევ ვიძახებთ გოთუსლაიდ ფუქციას რადგან სკოუპიდან გარეთაც იყოს გამოძახებული.
  next.addEventListener("click", nextSlide);
  back.addEventListener("click", prevSlide);
  goToSlide();
  //აქ ივენთლისენერებს ვაყენებთ კლავიატურაზე ისრებზე დაჭერის დროს რომ შეიცვალონ ქარდები.
  document.addEventListener("keydown", function (a) {
    if (a.key === "ArrowLeft") {
      prevSlide();
    }
    a.key === "ArrowRight" && nextSlide();
  });

  // წერტილების გაკეთება სლაიდერისთვის
  const dotSlide = function () {
    slider.forEach((_, i) =>
      dotebi.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    );
  };

  const activeDots = function (num) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((a) => a.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${num}"]`)
      .classList.add("dots__dot--active");
  };

  const goToDot = function (e) {
    e.preventDefault();
    if (e.target.classList.contains("dots__dot")) {
      curSlide = +e.target.dataset.slide;
      console.log(e.target.dataset.slide);
      goToSlide(curSlide);
      activeDots(curSlide);
    }
  };
  const init = function () {
    dotSlide();
    activeDots(0);
    goToSlide(0);
  };

  init();
  dotebi.addEventListener("click", goToDot);
};

//თვითონ სლაიდერის ფუქნცია გამოვიძახეთ./
sliderr();
