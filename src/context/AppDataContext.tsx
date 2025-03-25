import React, { createContext, useState, useContext } from 'react';

// Định nghĩa kiểu dữ liệu cho context
interface AppContextType {
  name: string;
  data: any;
  setData: (newData: any) => void;
  onDataChange: (newData: any) => void;
  updateName: (newName: string) => void;
}

// Tạo context với giá trị mặc định
const AppContext = createContext<AppContextType>({
  name: '',
  data: null,
  setData: () => { },
  onDataChange: () => { },
  updateName: () => { }
});

// Provider component để bao bọc toàn bộ ứng dụng
export const AppProvider: React.FC<{
  initialName: string;
  initialData: any;
  onDataChangeCallback: (newData: any) => void;
  children: React.ReactNode
}> = ({
  initialName,
  initialData,
  onDataChangeCallback,
  children
}) => {
    const [name, setName] = useState(initialName);
    const [data, setData] = useState(initialData);

    // Hàm cập nhật name
    const updateName = (newName: string) => {
      setName(newName);
    };

    // Hàm xử lý thay đổi dữ liệu
    const onDataChange = (newData: any) => {
      // setData(newData);
      onDataChangeCallback(newData);
    };

    return (
      <AppContext.Provider value={{
        name,
        data,
        setData,
        onDataChange,
        updateName,
      }}>
        {children}
      </AppContext.Provider>
    );
  };

// Hook để sử dụng context dễ dàng trong các component
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// // Ví dụ một component sử dụng context
// const ExampleComponent: React.FC = () => {
//   const { name, data, onDataChange, updateName } = useAppContext();

//   return (
//     <div>
//       <h1>Name: {name}</h1>
//       <button onClick={() => updateName('New Name')}>
//         Update Name
//       </button>
//       <button onClick={() => onDataChange({ newValue: 'Example' })}>
//         Change Data
//       </button>
//     </div>
//   );
// };

// // Component chính của ứng dụng
// const App: React.FC = () => {
//   // Hàm callback để gửi dữ liệu về Angular
//   const handleDataChange = (newData: any) => {
//     // Đây là nơi bạn sẽ gửi dữ liệu ngược lại Angular
//     console.log('Data changed:', newData);
//   };

//   return (
//     <AppProvider
//       initialName="Initial Name"
//       initialData={null}
//       onDataChangeCallback={handleDataChange}
//     >
//       <ExampleComponent />
//       {/* Các component khác */}
//     </AppProvider>
//   );
// };

// export default App;