export type Testimonial = {
  id: number;
  name: string;
  review: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmad F.',
    review: 'Servis terbaik! Cepat dan mudah. Lepas bayar terus dapat akaun. Kandungan semua premium, memang puas hati.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Siti N.',
    review: 'Harga sangat berpatutan. Jimat banyak banding langgan terus. Kualiti gambar pun cun, takde sangkut-sangkut.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ravi K.',
    review: 'Admin sangat membantu. Ada masalah sikit masa login, terus dia tolong selesaikan. Recommended seller!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Mei Ling',
    review: 'Dah renew 3 kali. Memang tak cari lain dah. Servis konsisten, harga pun maintain murah.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Irfan H.',
    review: 'Good service, but sometimes the activation can take up to 2 hours. Overall still satisfied.',
    rating: 4,
  },
  {
    id: 6,
    name: 'Zulaikha A.',
    review: 'Pilihan yang bijak untuk hiburan keluarga. Banyak movie baru. Anak-anak suka, saya pun suka. Terima kasih!',
    rating: 5,
  },
];
