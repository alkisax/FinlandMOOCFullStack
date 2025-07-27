export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy' ;
export type Visibility = 'great' | 'good' | 'ok' | 'poor';

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
};

 type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [isShowingComments, setIsShowingComments] = useState<boolean>(false);
  const [hasFetchedComments, setHasFetchedComments] = useState<boolean>(false);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '1/1/1970',
    weather: 'sunny',
    visibility: 'ok',
    comment: ''
  })

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

  const createEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${url}/api/diaries`, newEntry)
      console.log("saved", response.data);

      setNewEntry({
        date: '1/1/1970',
        weather: 'sunny',
        visibility: 'ok',
        comment: ''
      })      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to save entry:', error);
      } else {
        console.error('unkown error');
      }
    }

    
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
      <br />


      <form onSubmit={createEntry}>
        <label>Date</label>
        <input 
          value={newEntry.date}
          onChange={(event) => setNewEntry({ ...newEntry, date: event.target.value })}
        />
        <label>Weather</label>
        <input 
          value={newEntry.weather}
          onChange={(event) => setNewEntry({ ...newEntry, weather: event.target.value as Weather})}
        />
        <label>visibility</label>
        <input 
          value={newEntry.visibility}
          onChange={(event) => setNewEntry({ ...newEntry, visibility: event.target.value as Visibility})}
        />
        <label>comment</label>
        <input 
          value={newEntry.comment}
          onChange={(event) => setNewEntry({ ...newEntry, comment: event.target.value })}
        />        
        <button type='submit'>add</button>

      </form>
      <br />
    </>
  )
}

export default App
