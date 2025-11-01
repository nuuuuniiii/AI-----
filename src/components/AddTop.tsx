interface AddTopProps {
  onClose: () => void;
  onMoveDown: () => void;
}

export default function AddTop({ onClose, onMoveDown }: AddTopProps) {
  return (
    <div className="bg-white border-2 border-[#9a8779] rounded-lg p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#473327]">빵집 1</h3>
        <div className="flex gap-2">
          <button
            onClick={onMoveDown}
            className="bg-[#9a8779] text-white px-3 py-1 rounded text-sm hover:bg-[#7a6f5f]"
          >
            ↓
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            빵집 이름
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="빵집 이름"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            주소
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="주소"
          />
        </div>
      </div>
    </div>
  );
}