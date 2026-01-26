# find the index of item z in the list arr:

def binary_search(arr: list, z: str) -> int :

    low = 0
    high = len(arr) - 1

    while low <= high: 
        mid = (low + high) // 2
        guess = arr[mid]
        if z == guess:
            return mid
        elif z > guess :
            low = mid + 1 
        elif z  < guess:
            high = mid - 1
        else:
            return None

my_list = [1, 3, 5, 7, 9]

print(binary_search(my_list, 7))
print(binary_search(my_list, 1))

# time complexity : O(N)
