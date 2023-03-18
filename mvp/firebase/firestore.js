import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { getDownloadURL } from "./storage";

// Name of receipt collection in Firestore
const RECEIPT_COLLECTION = "receipts";

export function addReceipt(
  uid,
  date,
  locationName,
  address,
  items,
  amount,
  imageBucket
) {
  addDoc(collection(db, RECEIPT_COLLECTION), {
    uid,
    date,
    locationName,
    address,
    items,
    amount,
    imageBucket,
  });
}

export async function getReceipts(uid, setReceipts, setIsLoadingReceipts) {
  const receiptsQuery = query(
    collection(db, RECEIPT_COLLECTION),
    where("uid", "==", uid),
    orderBy("date", "desc")
  );

  const unsubscribe = onSnapshot(receiptsQuery, async (snapshot) => {
    let allReceipts = [];
    for (const documentSnapshot of snapshot.docs) {
      const receipt = documentSnapshot.data();
      allReceipts.push({
        ...receipt,
        date: receipt["date"].toDate(),
        id: documentSnapshot.id,
        imageUrl: await getDownloadURL(receipt["imageBucket"]),
      });
    }
    setReceipts(allReceipts);
    setIsLoadingReceipts(false);
  });
  return unsubscribe;
}

// Updates receipt with @docId with given information.
export function updateReceipt(
  docId,
  uid,
  date,
  locationName,
  address,
  items,
  amount,
  imageBucket
) {
  setDoc(doc(db, RECEIPT_COLLECTION, docId), {
    uid,
    date,
    locationName,
    address,
    items,
    amount,
    imageBucket,
  });
}

// Deletes receipt with given @id.
export function deleteReceipt(id) {
  deleteDoc(doc(db, RECEIPT_COLLECTION, id));
}
