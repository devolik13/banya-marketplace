"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Transition } from "@headlessui/react";
import { Star, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function TestimonialsGridWithCenteredCarousel() {
  const { t } = useLanguage();
  
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-20 overflow-hidden h-full bg-background">
      <div className="pb-20">
        <h1 className="pt-4 font-bold text-foreground text-lg md:text-2xl">
          {t('testimonials.title')}
        </h1>
        <p className="text-base text-muted-foreground">
          {t('testimonials.subtitle')}
        </p>
      </div>

      <div className=" relative">
        <TestimonialsSlider />
        <div className="h-full max-h-screen md:max-h-none overflow-hidden w-full bg-foreground opacity-30 [mask-image:radial-gradient(circle_at_center,transparent_10%,white_99%)]">
          <TestimonialsGrid />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-40 w-full bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}

export const TestimonialsGrid = () => {
  const first = testimonials.slice(0, 3);
  const second = testimonials.slice(3, 6);
  const third = testimonials.slice(6, 9);
  const fourth = testimonials.slice(9, 12);

  const grid = [first, second, third, fourth];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto ">
      {grid.map((testimonialsCol, index) => (
        <div key={`testimonials-col-${index}`} className="grid gap-4">
          {testimonialsCol.map((testimonial) => (
            <Card key={`testimonial-${testimonial.src}-${index}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {testimonial.experienceType}
                </span>
                {testimonial.verified && (
                  <CheckCircle className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <Quote>{testimonial.quote}</Quote>
              <div className="flex gap-2 items-center mt-8">
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <QuoteDescription className="font-medium">{testimonial.name}</QuoteDescription>
                  <QuoteDescription className="text-[10px]">
                    {testimonial.designation}
                  </QuoteDescription>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "p-8 rounded-xl border border-border bg-card dark:border-border dark:bg-card shadow-[2px_4px_16px_0px_rgba(217,119,6,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-xs font-semibold text-card-foreground py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-xs font-normal text-muted-foreground max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

interface Testimonial {
  src: string;
  quote: string;
  name: string;
  designation?: string;
  experienceType: 'Услуга' | 'Заведение' | 'Товар';
  rating: number;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: "Елена Петрова",
    quote: "Банщик в Банном Блаженстве был невероятным! Процедура platza была идеально рассчитана по времени, а температура экспертно контролировалась. Я чувствовала себя полностью обновлённой после сеанса.",
    src: "https://i.pravatar.cc/150?img=1",
    designation: "Энтузиаст оздоровления",
    experienceType: "Услуга",
    rating: 5,
    verified: true,
  },
  {
    name: "Маркус Чен",
    quote: "Подлинный русский банный опыт! Помещения были безупречно чистыми, веник свежим, а купель идеальной температуры. Ароматические масла стали прекрасным дополнением.",
    src: "https://i.pravatar.cc/150?img=2",
    designation: "Ценитель сауны",
    experienceType: "Заведение",
    rating: 5,
    verified: true,
  },
  {
    name: "София Андерссон",
    quote: "Заказала премиальный набор берёзовых веников и он превзошёл ожидания. Листья были идеально высушены, аромат небесным, и их хватило на несколько сессий.",
    src: "https://i.pravatar.cc/150?img=3",
    designation: "Владелица домашней сауны",
    experienceType: "Товар",
    rating: 5,
    verified: true,
  },
  {
    name: "Дмитрий Волков",
    quote: "Техника мастера Ивана не имеет равных. То, как он читает реакцию вашего тела на тепло и соответственно корректирует процедуру, показывает истинное мастерство. Это подлинная банная культура в лучшем её проявлении.",
    src: "https://i.pravatar.cc/150?img=4",
    designation: "Традиционный банщик",
    experienceType: "Услуга",
    rating: 5,
    verified: true,
  },
  {
    name: "Анна Уильямс",
    quote: "Городская баня превзошла все ожидания. Современные удобства при сохранении традиционных практик. Качество пара было исключительным, а зона отдыха идеально спроектирована.",
    src: "https://i.pravatar.cc/150?img=5",
    designation: "Обозреватель СПА",
    experienceType: "Заведение",
    rating: 4,
    verified: true,
  },
  {
    name: "Джейк Томпсон",
    quote: "Продукты для медового скраба феноменальны! Натуральные ингредиенты, идеальная текстура, и моя кожа чувствовала себя потрясающе в течение нескольких дней. Обязательно буду заказывать снова.",
    src: "https://i.pravatar.cc/150?img=6",
    designation: "Энтузиаст ухода за кожей",
    experienceType: "Товар",
    rating: 5,
    verified: true,
  },
  {
    name: "Катя Новак",
    quote: "Сессия platza мастера Светланы была терапевтической дословно. Она точно поняла, что нужно моему телу, и сочетание техник оставило меня полностью обновлённой.",
    src: "https://i.pravatar.cc/150?img=7",
    designation: "Тренер по оздоровлению",
    experienceType: "Услуга",
    rating: 5,
    verified: true,
  },
  {
    name: "Роберт Ким",
    quote: "Фантастическая банная площадка с аутентичным дизайном и современными функциями безопасности. Общественный опыт был гостеприимным, а знания персонала о традиционных практиках впечатляющими.",
    src: "https://i.pravatar.cc/150?img=8",
    designation: "Энтузиаст архитектуры",
    experienceType: "Заведение",
    rating: 4,
    verified: true,
  },
  {
    name: "Ирина Сато",
    quote: "Смесь зелёного чая для банных сессий необыкновенна. Аромат создаёт идеальную атмосферу, а терапевтические свойства красиво дополняют весь опыт.",
    src: "https://i.pravatar.cc/150?img=9",
    designation: "Ароматерапевт",
    experienceType: "Товар",
    rating: 5,
    verified: true,
  },
  {
    name: "Карлос Ривера",
    quote: "Профессиональная услуга банщика, которая изменила моё понимание тепловой терапии. Персонализированный подход и внимание к безопасности сделали это незабываемым путешествием в мир оздоровления.",
    src: "https://i.pravatar.cc/150?img=10",
    designation: "Фитнес-тренер",
    experienceType: "Услуга",
    rating: 5,
    verified: true,
  },
  {
    name: "Надя Козлова",
    quote: "Красивая традиционная баня со всеми аутентичными элементами - от дровяной печи до берёзовых веток. Атмосфера перенесла меня в детство в России.",
    src: "https://i.pravatar.cc/150?img=11",
    designation: "Защитник культурного наследия",
    experienceType: "Заведение",
    rating: 5,
    verified: true,
  },
  {
    name: "Майкл О'Брайен",
    quote: "Облепиховое масло невероятно для ухода за кожей после сауны. Богатое, питательное и прекрасно впитывается. Моя кожа никогда не чувствовала себя лучше с тех пор, как я включил это в свой распорядок.",
    src: "https://i.pravatar.cc/150?img=12",
    designation: "Сторонник натурального здоровья",
    experienceType: "Товар",
    rating: 4,
    verified: true,
  },
  {
    name: "Юки Танака",
    quote: "Мастер Борис идеально сочетает традиционные техники с современными знаниями по оздоровлению. Сессия была одновременно расслабляющей и бодрящей - именно такой должна быть настоящая баня.",
    src: "https://i.pravatar.cc/150?img=13",
    designation: "Исследователь оздоровления",
    experienceType: "Услуга",
    rating: 5,
    verified: true,
  },
  {
    name: "Изабелла Мартинес",
    quote: "Современный банный опыт, который чтит традицию, обеспечивая роскошные удобства. Дизайн потрясающий, а распределение тепла по всему пространству идеально сбалансировано.",
    src: "https://i.pravatar.cc/150?img=14",
    designation: "Энтузиаст дизайна интерьера",
    experienceType: "Заведение",
    rating: 4,
    verified: true,
  },
];

export const TestimonialsSlider = () => {
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const slicedTestimonials = testimonials.slice(0, 3);

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(
        active + 1 === slicedTestimonials.length ? 0 : (active) => active + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [active, autorotate, slicedTestimonials.length]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        heightFix();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className="absolute inset-0 mt-20 md:mt-60">
      <div className="max-w-3xl mx-auto  relative z-40 h-80">
        <div className="relative pb-12 md:pb-20">
          {/* Carousel */}
          <div className="text-center">
            {/* Testimonial image */}
            <div className="relative h-40 [mask-image:_linear-gradient(0deg,transparent,#FFFFFF_30%,#FFFFFF)] md:[mask-image:_linear-gradient(0deg,transparent,#FFFFFF_40%,#FFFFFF)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] -z-10 pointer-events-none before:rounded-full rounded-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/20 before:to-transparent before:to-20% after:rounded-full after:absolute after:inset-0 after:bg-card after:dark:bg-card after:m-px before:-z-20 after:-z-20">
                {slicedTestimonials.map((item, index) => (
                  <Transition
                    as="div"
                    key={index}
                    show={active === index}
                    enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                    enterFrom="opacity-0 -translate-x-10"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-10"
                    beforeEnter={() => heightFix()}
                  >
                    <div className="absolute inset-0 h-full -z-10">
                      <Image
                        className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                        src={item.src}
                        width={56}
                        height={56}
                        alt={item.name}
                      />
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
            {/* Text */}
            <div className="mb-10 transition-all duration-150 delay-300 ease-in-out px-8 sm:px-6">
              <div className="relative flex flex-col" ref={testimonialsRef}>
                {slicedTestimonials.map((item, index) => (
                  <Transition
                    as="div"
                    key={index}
                    show={active === index}
                    enter="transition ease-in-out duration-500 delay-200 order-first"
                    enterFrom="opacity-0 -translate-x-4"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-out duration-300 delay-300 absolute"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-4"
                    beforeEnter={() => heightFix()}
                  >
                    <div className="text-base text-foreground md:text-xl font-bold mb-4">
                      {item.quote}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {item.experienceType}
                      </span>
                      {item.verified && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex justify-center gap-1">
                      {Array.from({ length: item.rating }, (_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </Transition>
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap justify-center -m-1.5 px-8 sm:px-6">
              {slicedTestimonials.map((item, index) => (
                <button
                  className={cn(
                    `px-2 py-1 rounded-full m-1.5 text-xs border transition duration-150 ease-in-out relative ${
                      active === index
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border opacity-70 text-muted-foreground hover:opacity-100"
                    }`
                  )}
                  key={index}
                  onClick={() => {
                    setActive(index);
                    setAutorotate(false);
                  }}
                >
                  <span className="relative">
                    <span className="font-bold">
                      {item.name}
                    </span>{" "}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};