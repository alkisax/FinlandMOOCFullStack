export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
};

import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [isShowingComments, setIsShowingComments] = useState<boolean>(false);
  const [hasFetchedComments, setHasFetchedComments] = useState<boolean>(false);

  const url = 'http://localhost:3001'

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>(`${url}/api/diaries`);
        setDiaryEntries(response.data);
      } catch (error) {
        console.error('Failed to fetch diary entries:', error);
      }
    };

    getAllEntries();
  }, [])

  useEffect(() => {
    if (!isShowingComments) return;
    if (hasFetchedComments) return;

    console.log('All diaries:', diaryEntries);

    const fetchComments = async () => {
      const updatedEntries = [];

      for (const entry of diaryEntries) {
        try {
          console.log("entry id: ", entry.id);
          
          const fetchedEntry = await axios.get<DiaryEntry>(`${url}/api/diaries/${entry.id}`);
          updatedEntries.push({
            ...entry,
            comment: fetchedEntry.data.comment
          })
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('Failed to fetch diary entries:', error);
          } else {
            console.error('unkown error');
          }
        }
      };
      setDiaryEntries(updatedEntries);
      setHasFetchedComments(true);
    }
    fetchComments();
  }, [isShowingComments, diaryEntries, hasFetchedComments])

  const handleShowCommentsBtn = () => {
    setIsShowingComments(!isShowingComments)
  }


  return (
    <>

      <button onClick={handleShowCommentsBtn}>
        show comments
      </button>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>date</th>
            <th>weather</th>
            <th>visibility</th>
            <th>comment</th>          
          </tr>          
        </thead>

        <tbody>
          {diaryEntries.map(entry => {
            return(
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.date}</td>
              <td>{entry.weather}</td>
              <td>{entry.visibility}</td>
              <td>
                {isShowingComments? (entry.comment) : '-'}
              </td>
            </tr>            
            )
          })}          
        </tbody>
      </table>
    </>
  )
}

export default App
