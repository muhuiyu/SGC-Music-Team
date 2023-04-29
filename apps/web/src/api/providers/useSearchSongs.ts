// export default function useSearchSongs() {
//   const { data: songs, isFetching } = ({
//     queryKey: [songsQueryKey],
//     queryFn: async () => {
//       const querySnapshot = await getDocs(collection(db, songsReference))
//       return querySnapshot.docs.map(songFromSnapshot)
//     },
//   })

//   const queryClient = useQueryClient()
//   const mutation = useMutation({
//     mutationFn: ({ songId, details }: { songId: Song['id']; details: Partial<Song> }) => {
//       return updateDoc(doc(db, songsReference, songId), details)
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries([songsQueryKey])
//     },
//   })
//   const addMutation = useMutation({
//     mutationFn: ({ details }: { details: Omit<Song, 'id'> }) => {
//       return addDoc(collection(db, songsReference), details)
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries([songsQueryKey])
//     },
//   })

//   const updateSong = useCallback(
//     (songId: Song['id'], details: Partial<Song>) => {
//       mutation.mutate({ songId, details })
//     },
//     [mutation],
//   )

//   const addSong = useCallback(
//     (details: Omit<Song, 'id'>) => {
//       addMutation.mutate({ details })
//     },
//     [addMutation],
//   )

//   return {
//     songs: songs ?? [],
//     isLoading: isFetching,
//     addSong,
//     updateSong,
//   }
// }
