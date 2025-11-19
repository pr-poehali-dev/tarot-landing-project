import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const services = [
    {
      title: 'Общий расклад',
      description: 'Ответы на волнующие вопросы о вашей жизненной ситуации',
      duration: '45 минут',
      price: '3 000 ₽',
      icon: 'Sparkles'
    },
    {
      title: 'Любовный расклад',
      description: 'Прояснение отношений, любовные перспективы',
      duration: '60 минут',
      price: '3 500 ₽',
      icon: 'Heart'
    },
    {
      title: 'Карьера и финансы',
      description: 'Профессиональное развитие и денежные вопросы',
      duration: '45 минут',
      price: '3 000 ₽',
      icon: 'Coins'
    },
    {
      title: 'Годовой прогноз',
      description: 'Детальный анализ предстоящего года',
      duration: '90 минут',
      price: '5 000 ₽',
      icon: 'Calendar'
    }
  ];

  const spreads = [
    {
      name: 'Расклад на день',
      cards: '1 карта',
      description: 'Быстрый взгляд на энергию дня'
    },
    {
      name: 'Три карты',
      cards: '3 карты',
      description: 'Прошлое - Настоящее - Будущее'
    },
    {
      name: 'Кельтский крест',
      cards: '10 карт',
      description: 'Глубокий анализ ситуации'
    },
    {
      name: 'Выбор пути',
      cards: '7 карт',
      description: 'Помощь в принятии решения'
    }
  ];

  const reviews = [
    {
      name: 'Анна',
      text: 'Невероятно точный расклад! Всё сбылось именно так, как было предсказано. Благодарю за помощь в трудный момент.',
      rating: 5
    },
    {
      name: 'Мария',
      text: 'Профессиональный подход, деликатность и глубокое понимание. Консультация помогла разобраться в себе.',
      rating: 5
    },
    {
      name: 'Елена',
      text: 'Расклад на год оказался очень точным. Спустя полгода понимаю, что все совпадает. Рекомендую!',
      rating: 5
    }
  ];

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    
    if (!date || !selectedTime) {
      toast({
        title: 'Ошибка',
        description: 'Выберите дату и время консультации',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Заявка отправлена! ✨',
      description: `${name}, я свяжусь с вами для подтверждения записи на ${date.toLocaleDateString('ru-RU')} в ${selectedTime}`,
    });
    
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C] text-foreground overflow-hidden">
      <div className="fixed inset-0 bg-[url('https://cdn.poehali.dev/projects/82f88a49-2f9e-4a48-afd6-8af45311e3cb/files/91ac6325-de09-44d1-80f5-a0ebc96b0367.jpg')] bg-cover bg-center opacity-20 pointer-events-none" />
      
      <nav className="relative z-10 container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold font-serif text-accent">✨ Таро</div>
        <div className="hidden md:flex gap-8">
          <a href="#about" className="hover:text-secondary transition-colors">Обо мне</a>
          <a href="#services" className="hover:text-secondary transition-colors">Услуги</a>
          <a href="#spreads" className="hover:text-secondary transition-colors">Расклады</a>
          <a href="#reviews" className="hover:text-secondary transition-colors">Отзывы</a>
          <a href="#contact" className="hover:text-secondary transition-colors">Контакты</a>
        </div>
      </nav>

      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-6xl mb-6 animate-float">✨</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
            Раскройте тайны судьбы
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Профессиональные таро-консультации для тех, кто ищет ответы
          </p>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
                Записаться на консультацию
                <Icon name="ArrowRight" className="ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">Онлайн-запись</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" name="name" required placeholder="Ваше имя" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" name="phone" required type="tel" placeholder="+7 (___) ___-__-__" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" required type="email" placeholder="your@email.com" />
                </div>
                
                <div className="space-y-2">
                  <Label>Выберите дату</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="rounded-md border w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Выберите время</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? 'default' : 'outline'}
                        onClick={() => setSelectedTime(time)}
                        className="w-full"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Вопрос или пожелания</Label>
                  <Textarea id="message" name="message" placeholder="Опишите кратко вашу ситуацию" rows={4} />
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  Отправить заявку
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section id="about" className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img 
                src="https://cdn.poehali.dev/projects/82f88a49-2f9e-4a48-afd6-8af45311e3cb/files/c92b1719-fb64-4358-929e-d07e08173165.jpg" 
                alt="Таролог" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold font-serif">Обо мне</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Приветствую! Меня зовут Анастасия, и я практикующий таролог с опытом работы более 8 лет. 
                Таро для меня – это не просто карты, это язык символов, который помогает раскрыть 
                глубинные процессы вашей жизни.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Я верю, что каждый человек имеет право знать свой путь и делать осознанный выбор. 
                Мои консультации помогут вам увидеть ситуацию с разных сторон и найти свой ответ.
              </p>
              <div className="flex gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">8+</div>
                  <div className="text-sm text-muted-foreground">лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">1000+</div>
                  <div className="text-sm text-muted-foreground">консультаций</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">500+</div>
                  <div className="text-sm text-muted-foreground">благодарных клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12">Услуги</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur border-border hover:border-primary transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <Icon name={service.icon as any} className="text-primary" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-secondary">{service.price}</div>
                  </div>
                  <h3 className="text-2xl font-bold font-serif">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    {service.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="spreads" className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12">Популярные расклады</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {spreads.map((spread, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur border-border hover:border-accent transition-all duration-300">
                <CardContent className="p-6 space-y-3 text-center">
                  <div className="text-4xl">🃏</div>
                  <h3 className="text-xl font-bold font-serif">{spread.name}</h3>
                  <div className="text-secondary font-semibold">{spread.cards}</div>
                  <p className="text-sm text-muted-foreground">{spread.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12">Отзывы</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-secondary fill-secondary" size={16} />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                  <div className="font-semibold">— {review.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <img 
            src="https://cdn.poehali.dev/projects/82f88a49-2f9e-4a48-afd6-8af45311e3cb/files/c48134df-7aaa-4bd8-9de5-134fd9a444d2.jpg" 
            alt="Таро карты" 
            className="rounded-2xl shadow-2xl mx-auto max-w-2xl"
          />
          <h2 className="text-4xl md:text-5xl font-bold font-serif">Готовы узнать свой путь?</h2>
          <p className="text-xl text-muted-foreground">
            Запишитесь на консультацию прямо сейчас
          </p>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6">
                Записаться
                <Icon name="Calendar" className="ml-2" />
              </Button>
            </DialogTrigger>
          </Dialog>
          <div className="pt-8 space-y-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Icon name="Mail" size={20} />
              <a href="mailto:info@tarot.ru" className="hover:text-secondary transition-colors">
                info@tarot.ru
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Icon name="Phone" size={20} />
              <a href="tel:+79991234567" className="hover:text-secondary transition-colors">
                +7 (999) 123-45-67
              </a>
            </div>
            <div className="flex justify-center gap-4 pt-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Send" size={20} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Instagram" size={20} fallback="Camera" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Facebook" size={20} fallback="Share2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Таро-консультации. Все права защищены.</p>
          <p className="text-sm mt-2">Раскройте свою судьбу с помощью древней мудрости карт</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
