// معرض الكتب — أغلفة حقيقية من مؤلفات وأعمال أ.د. سيف الدين عبد الفتاح
// الصور محفوظة محليًا في public/images/books

export interface BookCover {
  src: string;
  alt: string;
}

export const BOOKS: BookCover[] = [
  { src: '/images/books/book1.png', alt: 'غلاف كتاب من مؤلفات أ.د. سيف الدين عبد الفتاح' },
  { src: '/images/books/book2.png', alt: 'غلاف كتاب من مؤلفات أ.د. سيف الدين عبد الفتاح' },
  { src: '/images/books/book3.png', alt: 'غلاف كتاب من مؤلفات أ.د. سيف الدين عبد الفتاح' },
  { src: '/images/books/book4.png', alt: 'غلاف كتاب من مؤلفات أ.د. سيف الدين عبد الفتاح' },
  { src: '/images/books/book5.png', alt: 'غلاف كتاب من مؤلفات أ.د. سيف الدين عبد الفتاح' },
  { src: '/images/books/book6.png', alt: 'غلاف كتاب من مؤلفات أ.د. سيف الدين عبد الفتاح' },
  { src: '/images/books/book7.png', alt: 'غلاف كتاب من مؤلفات أ.د. سيف الدين عبد الفتاح' },
  { src: '/images/books/book8.png', alt: 'غلاف كتاب من مؤلفات أ.د. سيف الدين عبد الفتاح' },
  { src: '/images/books/book9.png', alt: 'غلاف كتاب من مؤلفات أ.د. سيف الدين عبد الفتاح' },
];

// شعارات المراكز الصديقة (محفوظة محليًا)
export interface CenterLogo {
  src: string;
  name: string;
}

export const CENTER_LOGOS: CenterLogo[] = [
  { src: '/images/centers/acrps.png', name: 'المركز العربي للأبحاث ودراسة السياسات' },
  { src: '/images/centers/fekrislamy.jpeg', name: 'المعهد العالمي للفكر الإسلامي' },
  { src: '/images/centers/hadara.jpeg', name: 'مركز الدراسات الحضارية وحوار الثقافات' },
  { src: '/images/centers/fekrcenter.jpeg', name: 'مركز الدراسات المعرفية' },
  { src: '/images/centers/ruyaa.png', name: 'مؤسسة رؤية للفكر' },
  { src: '/images/centers/center5.png', name: 'مركز البحوث والدراسات السياسية — جامعة القاهرة' },
];
