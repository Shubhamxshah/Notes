def findsmallest(arr: list) -> int: 
    smallest = arr[0]
    smallest_index = 0
    for i in range(1, len(arr)):
        if arr[i] < smallest :
            smallest = arr[i]
            smallest_index = i 
    return smallest_index 

def selectionsort(arr : list) -> list:
    newArr = []
    copiedArr = list(arr)
    for i in range(len(arr)): 
        smallest = findsmallest(copiedArr)
        newArr.append(copiedArr.pop(smallest))
    return newArr

print(selectionsort([5,3,6,2,1,8]))

# time complexity: O(N^2)
