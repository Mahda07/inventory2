
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyCfqZD7UZZt-GWmtNhfJyksrv3-8ENRjto",
  authDomain: "insan-cemerlang-d5574.firebaseapp.com",
  projectId: "insan-cemerlang-d5574",
  storageBucket: "insan-cemerlang-d5574.appspot.com",
  messagingSenderId: "1035937160050",
  appId: "1:1035937160050:web:6d77d3874c3f78b2811beb",
  measurementId: "G-EVVQ80Q08C"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function tambahBarang(item, harga,jumlah) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "inventory"), {
      item: item,
      harga: harga,
      jumlah:jumlah
    })

    // menampilkan pesan berhasil
    console.log("berhasip menyimpan data barang")
  } catch (e) {
    // menampilkan pesan gagal
    console.log("gagal menyimpan data barang" + e)
  }
}
export async function hapusBarang(id) {
    await deleteDoc(doc(basisdata,"inventory",id))
  }

export async function ambilDaftarBarang() {
  const refDokumen = collection(basisdata, "inventory");
  const kueri = query(refDokumen, orderBy("item"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = []; 
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      harga: dokumen.data().harga,
      jumlah: dokumen.data().jumlah
    })
  })
  
  return hasilKueri;
}
  
 export async function ubahBarang(id, item,harga,jumlah) {
   await updateDoc(
     doc(basisdata, "inventory", id),
     { 
     item: item,
     harga: harga,
     jumlah:jumlah
       
     })
   }
   
   export async function ambilBarang(id) {
    const refDokumen = await doc(basisdata, "inventory", id)
    const snapshotDocumen = await getDoc(refDokumen)
    
    return await snapshotDocumen.data()
  }

