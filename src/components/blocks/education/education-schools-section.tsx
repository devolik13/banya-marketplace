"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Globe, Mail, Star, Users, Clock, Award } from 'lucide-react';

interface School {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  logo: string;
  rating: number;
  studentsCount: number;
  keyFeatures: string[];
  address: string;
  phone: string;
  website: string;
  email: string;
  courseDuration: string;
  certifications: string[];
  price: string;
  specialties: string[];
}

const schools: School[] = [
  {
    id: '1',
    name: 'Академия Русской Бани',
    shortDescription: 'Ведущее учебное заведение по подготовке банщиков и массажистов с традициями русского банного мастерства',
    fullDescription: 'Академия Русской Бани — престижное образовательное учреждение, специализирующееся на обучении искусству русского банного дела и профессиональному массажу. Наша академия сочетает вековые традиции русской бани с современными методиками оздоровления и релаксации.',
    logo: '🏛️',
    rating: 4.9,
    studentsCount: 2500,
    keyFeatures: [
      'Авторские методики обучения',
      'Практические занятия в настоящих банях',
      'Международные сертификаты',
      'Трудоустройство выпускников'
    ],
    address: 'г. Москва, ул. Банная, д. 15',
    phone: '+7 (495) 123-45-67',
    website: 'www.russkaya-banya-academy.ru',
    email: 'info@russkaya-banya-academy.ru',
    courseDuration: '2-6 месяцев',
    certifications: ['Государственный диплом', 'Международный сертификат SPA'],
    price: 'от 45 000 ₽',
    specialties: ['Банное дело', 'Классический массаж', 'Ароматерапия', 'Парение веником']
  },
  {
    id: '2',
    name: 'Институт Здоровья и Релаксации',
    shortDescription: 'Современная школа массажа и SPA-терапии с акцентом на wellness-технологии и оздоровительные практики',
    fullDescription: 'Институт Здоровья и Релаксации предлагает комплексное обучение современным методам массажа, SPA-терапии и оздоровительных практик. Мы готовим высококвалифицированных специалистов для работы в лучших wellness-центрах и банных комплексах.',
    logo: '🌿',
    rating: 4.8,
    studentsCount: 1800,
    keyFeatures: [
      'Современное оборудование',
      'Программы повышения квалификации',
      'Стажировки в лучших SPA-центрах',
      'Индивидуальный подход к обучению'
    ],
    address: 'г. Санкт-Петербург, пр. Невский, д. 88',
    phone: '+7 (812) 987-65-43',
    website: 'www.wellness-institute.ru',
    email: 'study@wellness-institute.ru',
    courseDuration: '1-4 месяца',
    certifications: ['Диплом о профессиональной переподготовке', 'Сертификат ESPA'],
    price: 'от 35 000 ₽',
    specialties: ['SPA-массаж', 'Лимфодренаж', 'Стоун-терапия', 'Гидромассаж']
  },
  {
    id: '3',
    name: 'Сибирская Школа Банных Мастеров',
    shortDescription: 'Традиционная школа с уникальными методиками сибирского банного искусства и народной медицины',
    fullDescription: 'Сибирская Школа Банных Мастеров сохраняет и передает древние традиции сибирского банного искусства. Наши программы основаны на многовековом опыте сибирских целителей и современных научных знаниях о пользе банных процедур для здоровья.',
    logo: '🏔️',
    rating: 4.7,
    studentsCount: 1200,
    keyFeatures: [
      'Уникальные сибирские методики',
      'Обучение травяной терапии',
      'Мастер-классы от народных целителей',
      'Экологически чистые продукты'
    ],
    address: 'г. Новосибирск, ул. Таежная, д. 42',
    phone: '+7 (383) 555-44-33',
    website: 'www.siberian-banya.ru',
    email: 'masters@siberian-banya.ru',
    courseDuration: '3-8 месяцев',
    certifications: ['Мастер банного дела', 'Специалист по фитотерапии'],
    price: 'от 28 000 ₽',
    specialties: ['Сибирская баня', 'Фитотерапия', 'Медовый массаж', 'Кедровая бочка']
  }
];

export default function EducationSchoolsSection() {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [region, setRegion] = useState('all');
  const [district, setDistrict] = useState('all');

  // Достаем регионы на основе адресов (допустим, город — это регион)
  const allRegions = Array.from(new Set(schools.map(school => {
    const cityMatch = school.address.match(/г\. ([^,]+)/);
    return cityMatch ? cityMatch[1] : 'Другое';
  })));

  // Предположим, округа только для Москвы:
  const allDistricts = [
    'Все округа',
    'Центральный',
    'Северный',
    'Южный',
    'Западный',
    'Восточный',
    'Северо-Западный',
    'Северо-Восточный',
    'Юго-Западный',
    'Юго-Восточный',
    'Новомосковский',
    'Троицкий'
  ];

  // Для фильтрации
  const filteredSchools = schools.filter((school) => {
    // Сначала по региону
    const cityMatch = school.address.match(/г\. ([^,]+)/);
    const city = cityMatch ? cityMatch[1] : 'Другое';
    if (region !== 'all' && city !== region) return false;
    // Затем по округу, если выбран регион Москва и district !== 'all'
    if (region === 'Москва' && district !== 'all') {
      // Округ указан после района или в конце адреса (жестко по формату не делаем)
      return school.address.includes(district);
    }
    return true;
  });

  const openModal = (school: School) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSchool(null);
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Обучение для банщиков и массажистов
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Выберите лучшую образовательную программу для профессионального развития в сфере банного дела и массажной терапии
          </p>
        </div>

        {/* region filter + округ фильтр */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          {/* Регион */}
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-foreground mb-2">Регион</label>
            <select
              value={region}
              onChange={e => {
                setRegion(e.target.value);
                setDistrict('all'); // сбросить округ при смене региона
              }}
              className="w-full bg-background border-border rounded-lg border px-3 py-2 outline-none"
            >
              <option value="all">Все регионы</option>
              {allRegions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          {/* Округ — активен только если выбрана Москва */}
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-foreground mb-2">Округ</label>
            <select
              value={district}
              onChange={e => setDistrict(e.target.value)}
              className="w-full bg-background border-border rounded-lg border px-3 py-2 outline-none"
              disabled={region !== 'Москва'}
            >
              <option value="all">Все округа</option>
              {allDistricts.filter(d => d !== 'Все округа').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSchools.map((school) => (
            <Card 
              key={school.id} 
              className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border bg-card"
              onClick={() => openModal(school)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-4xl">{school.logo}</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{school.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-xl text-card-foreground">{school.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {school.shortDescription}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{new Intl.NumberFormat('ru-RU').format(school.studentsCount)} выпускников</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Курс: {school.courseDuration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {school.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {school.specialties.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{school.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Подробнее
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedSchool && (
              <>
                <DialogHeader className="pb-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-6xl">{selectedSchool.logo}</div>
                    <div className="flex-1">
                      <DialogTitle className="text-2xl mb-2">{selectedSchool.name}</DialogTitle>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-primary text-primary" />
                          <span className="font-medium">{selectedSchool.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{new Intl.NumberFormat('ru-RU').format(selectedSchool.studentsCount)} студентов</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Award className="w-4 h-4" />
                          <span>От {selectedSchool.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogDescription className="text-base leading-relaxed">
                    {selectedSchool.fullDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Key Features */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Ключевые преимущества</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedSchool.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Специализации</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSchool.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Сертификация</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSchool.certifications.map((cert, index) => (
                        <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Контактная информация</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span>{selectedSchool.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-primary" />
                          <span>{selectedSchool.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary" />
                          <span>{selectedSchool.website}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-primary" />
                          <span>{selectedSchool.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => window.open(`https://${selectedSchool.website}`, '_blank')}
                    >
                      Перейти на сайт
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(`tel:${selectedSchool.phone}`)}
                    >
                      Позвонить
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}