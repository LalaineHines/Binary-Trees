class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(this.sortAndClean(array));
    }

    buildTree(array) {
        const start = 0;
        const end = array.length - 1;

        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);

        const root = new Node(array[mid]);
        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));
        return root;
    }

    sortAndClean(array) {
        const sortedArray = array.sort((a, b) => a - b);
        return [...new Set(sortedArray)];
    }

    // my Implimentation
    insert(value) {
        if (!this.root) {
            this.root = new Node(value);
            return "Successfully Added Value to Tree";
        }

        let node = this.root;
        let lastNode = null;

        while (node !== null) {
            if (node.data === value) return "Value Already Present";
            lastNode = node;
            node = value > node.data ? node.right : node.left;
        }

        if (value > lastNode.data) {
            lastNode.right = new Node(value);
        } else {
            lastNode.left = new Node(value);
        }

        return "Successfully Added Value to Tree";
    }

    // Help from Neetcode : https://www.youtube.com/watch?v=LFzAoJJt92M
    delete(value, root = this.root) {
        if (!root) return root;

        if (value > root.data) {
            root.right = this.delete(value, root.right);
        } else if (value < root.data) {
            root.left = this.delete(value, root.left);
        } else {
            if (!root.left) return root.right;
            if (!root.right) return root.left;

            let current = root.right;
            while (current.left) {
                current = current.left;
            }

            root.data = current.data;
            root.right = this.delete(root.data, root.right);
        }

        return root;
    }

    find(value) {
        let node = this.root;
        while (node !== null) {
            if (node.data === value) return node;
            if (value > node.data) {
                node = node.right;
            } else {
                node = node.left;
            }
        }
        return null;
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback function is required");
        }
        if (!this.root) return;
        let queue = [];
        queue.push(this.root);
        // while there is atleast one discovered node
        while (queue.length !== 0) {
            let current = queue.shift();
            callback(current);
            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }
    }

    preOrderForEach(callback, node = this.root) {
        if (typeof callback !== "function") {
            throw new Error("Callback function is required");
        }
        // <root> <left> <right>
        if (!node) return;
        callback(node);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }

    inOrderForEach(callback, node = this.root) {
        if (typeof callback !== "function") {
            throw new Error("Callback function is required");
        }
        // <left> <root> <right>
        if (!node) return;
        this.inOrderForEach(callback, node.left);
        callback(node);
        this.inOrderForEach(callback, node.right);
    }
    postOrderForEach(callback, node = this.root) {
        if (typeof callback !== "function") {
            throw new Error("Callback function is required");
        }
        // <left> <right> <root>
        if (!node) return;
        this.postOrderForEach(callback, node.left);
        this.postOrderForEach(callback, node.right);
        callback(node);
    }

    height(value) {
        const node = this.find(value);
        if (node === null) return "Value does not exist";

        return this.findHeight(node);
    }

    findHeight(node) {
        if (node === null) {
            return -1;
        }
        return (
            Math.max(this.findHeight(node.left), this.findHeight(node.right)) +
            1
        );
    }

    depth(value) {
        let node = this.root;
        let depth = 0;
        while (node !== null) {
            if (node.data === value) return depth;
            if (value > node.data) {
                node = node.right;
                depth++;
            } else {
                node = node.left;
                depth++;
            }
        }
        return "Value Not present in Tree";
    }

    isBalanced(root = this.root) {
        if (!root) return true;

        const leftHeight = this.findHeight(root.left);
        const rightHeight = this.findHeight(root.right);

        if (Math.abs(rightHeight - leftHeight) > 1) return false;

        const left = this.isBalanced(root.left);
        const right = this.isBalanced(root.right);

        if (!left || !right) return false;
        return true;
    }

    rebalance() {
        let allData = [];
        this.inOrderForEach((val) => allData.push(val.data));
        this.root = this.buildTree(allData);
        return "Successfully Rebalanced Tree";
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }
}