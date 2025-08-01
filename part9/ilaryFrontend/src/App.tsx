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
    date: '2025-01-01',
    weather: 'sunny',
    visibility: 'ok',
    comment: ''
  })
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

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
    console.log("to be 'posted' :", newEntry);
    
    
    try {
      const response = await axios.post(`${url}/api/diaries`, newEntry)
      console.log("saved", response.data);

      setDiaryEntries(prevEntries => [...prevEntries, response.data]);

      setNewEntry({
        date: '2025-01-01',
        weather: 'sunny',
        visibility: 'ok',
        comment: ''
      })      
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
      const errorMessage =`${error.response.data?.error?.[0]?.message ?? 'Unknown error occurred'}`
      console.log('Parsed error message:', errorMessage);
      setErrorMsg(`Failed to save entry: ${errorMessage}`);

      setIsError(true)
      setTimeout(() => {
          setIsError(false);
        }, 7000);
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

      {isError && <p style={{ color: 'red' }}><strong>{errorMsg}</strong></p>}

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

      <div>
        <h2>Add new entry</h2>
        <form onSubmit={createEntry}>
          <div>
            <label>Date</label>
            <input
              type='date'
              value={newEntry.date}
              onChange={(event) => setNewEntry({ ...newEntry, date: event.target.value })}
            />            
          </div>
          <div>
            <label>Weather:</label>
            {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map(weather => {
              return (
                <label 
                  key={weather}
                  style={{ display: 'block', marginBottom: '5px' }}
                >
                  <input
                    type="radio"
                    name='weather'
                    value={weather}
                    checked={newEntry.weather === weather}
                    onChange={(event) => {
                      setNewEntry({ ...newEntry, weather: event.target.value as Weather })
                    }}
                  />
                  {weather}
                </label>
              )              
            })}
          </div>


          <div>
            <label>visibility:</label>
            {['great', 'good', 'ok', 'poor'].map((visibility) => {
              return (
                <label
                  key={visibility}
                  style={{ display: 'block', marginBottom: '5px' }}
                >
                  <input 
                    type="radio" 
                    value={visibility}
                    checked={newEntry.visibility === visibility}
                    onChange={(event) => {
                      setNewEntry({ ...newEntry, visibility: event.target.value as Visibility})
                    }}
                  />
                  {visibility}
                </label>
              )
            })}
          </div>

          <div>
            <label>comment</label>
            <input 
              value={newEntry.comment}
              onChange={(event) => setNewEntry({ ...newEntry, comment: event.target.value })}
            />              
          </div>
      
          <button type='submit'>add</button>
        </form>
      </div>

      <br />
    </>
  )
}

export default App
